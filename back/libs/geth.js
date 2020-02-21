const cp = require('child_process')
const fs = require('fs')
const cryptoRandomString = require('crypto-random-string')
const rmrf = require('rmrf')
const findFreePort = require('find-free-port-sync-fixed');
const kill = require('tree-kill')

const Wallet = require('./wallet')
const toml = require('./toml')

module.exports = class {
    /** Создать модуль управления узлом.
     * params.path путь к папке с geth
     */
    constructor(params) {
        this.params = params
        this.path = params.path
        this.procs = {}
        // this.geth = (params.path || './geth/') + 'geth.exe'
        // this.datadir = (params.path || './data/')

        fs.watch(this.path + '/manifest.json', null, (eventType, filename) => {
            if (eventType.toString() == 'change') {
                this.load();
                // console.log(this.dump)
            }
        });

        this.load()
    }

    /** Загрузить параметры узла. Порт, узлы. pid запущенных клиентов */
    load() {
        if (fs.existsSync(this.path + '/manifest.json')) {
            this.dump = JSON.parse(fs.readFileSync(this.path + '/manifest.json'))
        }
        else
            this.dump = {}

        if (!this.dump.port)
            this.dump.port = 21000

        if (!this.dump.nodes)
            this.dump.nodes = []

        if (!this.dump.pids)
            this.dump.pids = {}
    }

    /** Сохранить параметры узла. */
    save() {
        fs.writeFileSync(this.path + '/manifest.json', JSON.stringify(this.dump, null, '\t'))
    }

    clear() {
        this.kill_all_nodes()
        rmrf(this.path + 'data')
        this.dump = {}
        this.save()
        this.load()
    }

    /** Зпустить экземпляр geth для указанного адреса=иям  узла=адрес bankwallet */
    start_node(address) {
        console.log('starting...')
        var ls = cp.spawn(this.path + 'geth', ['--config', this.path + '/data/.' + address + '/config.toml', '--ipcdisable'])
        // Грузим конфиг
        ls.stdout.on('data', (data) => {
            console.log(`stdout: ${data}`);
        });

        ls.stderr.on('data', (data) => {
            console.error(`stderr: ${data}`);
        });

        ls.on('close', (code) => {
            console.log(`child process exited with code ${code}`);
        });

        this.procs[address] = ls        
        this.dump.pids[address] = ls.pid
        this.save()
    }

    kill_node(address){
        kill(this.dump.pids[address])
        delete this.dump.pids[address]
        this.save()
    }

    start_all_nodes() {
        this.dump.nodes.forEach(n => this.start_node(n.wallet.address))
    }

    kill_all_nodes() {
        Object.values(this.dump.pids).forEach(pid => kill(pid))
        this.procs = {}
    }

    /** Создать новый экземпляр ноды.
     * returns
     *  .address адрес созданной ноды
     *  .rpcport порт для RPC взаимодействия
     *  .clusterport порт для кластера.
     */
    create_node() {
        var ns = {}

        // Ищем свободный порт для RPC
        while (findFreePort({ port: this.dump.port })) this.dump.port++;
        ns.rpcport = this.dump.port++;

        // Ищем свободный порт для Кластера
        while (findFreePort({ port: this.dump.port })) this.dump.port++;
        ns.clusterport = this.dump.port++;

        // Создаем банковский ключ.
        ns.wallet = Wallet.generate()
        var wallet = ns.wallet

        // Папка с данными 
        ns.dir = this.path + 'data/.' + wallet.address
        var dir = ns.dir

        // Создаем папку бч
        fs.mkdirSync(dir, { recursive: true })

        // Кидаем в нее genesis.json
        ns.chainId = Math.round(Math.random() * 99999999)
        this._create_genesis(ns)

        // Создаем файл конфигурации config.toml
        this._create_toml(ns)

        // Инициализируем БЧ
        var ls = cp.spawnSync(this.path + 'geth', ['--datadir', dir, 'init', dir + '/genesis.json'])

        this.dump.nodes.push(ns)
        this.save()
        if (ls.output.toString().includes('Successfully wrote genesis state'))
            return { "address": wallet.address, rpcport: ns.rpcport, clusterport: ns.clusterport }
        else
            return false

        return 0;


        var rnd = cryptoRandomString({ length: 10 })
        return rnd;


        // Заводим ноду
        var ls = cp.spawnSync(this.geth, ['--datadir', this.conf.datadir + '/.' + this.name, '--init', 'genesis.json'])
        var adr = ls.output.filter(x => x != null && x.toString().startsWith('Address'))
        console.log(adr.toString())


        // Удаляем папку

        // Создаем временную папку.


    }

    node(address){
        return this.dump.nodes.filter(n => n.wallet.address == address)[0]
    }

    _create_genesis(ns) {
        var genesis = JSON.parse(fs.readFileSync(this.path + 'genesis.json').toString())
        genesis.config.chainId = ns.chainId
        genesis.coinbase = '0x' + ns.wallet.address
        genesis.Alloc = {}
        genesis.Alloc['0x' + ns.wallet.address] = { balance: "9999999999999999999999999999999999999999999999999999999999999999999999" }

        fs.writeFileSync(ns.dir + '/genesis.json', JSON.stringify(genesis, null, '\t'))
    }

    _create_toml(ns) {
        var conf = {}
        conf['Eth'] = {
            NetworkId: ns.chainId,
            Etherbase: '0x' + ns.wallet.address
        }

        conf['Node.P2P'] = {
            // NoDiscovery = true
            BootstrapNodes: [],
            BootstrapNodesV5: [],
            ListenAddr: ":" + ns.clusterport
        }

        conf['Node'] = {
            DataDir: ns.dir,
            // IPCPath: "geth.inc",
            HTTPHost: "127.0.0.1",
            HTTPPort: ns.rpcport,
            HTTPModules: ["net", "web3", "eth", "shh", "admin", "miner"],
            HTTPCors: ["*"],
            HTTPVirtualHosts: ["localhost"]
        }

        fs.writeFileSync(ns.dir + '/config.toml', toml.stringify(conf))
    }

    import_key(privateKey, password) {
        // Скидываем данные во временные файлы
        fs.mkdirSync('tmp')
        fs.writeFileSync('tmp/private')
        fs.writeFileSync('tmp/password')

        var ls = cp.spawnSync(this.geth, ['--datadir', this.datadir, 'account', 'import', 'tmp/privtae', '--password', 'tmp', 'pass']) // --datadir ddd exec ""')
        var adr = ls.output.filter(x => x != null && x.toString().startsWith('Address'))
        fs.unlinkSync('tmp/private')
        fs.unlinkSync('tmp/password')
        console.log(adr.toString())
    }
}