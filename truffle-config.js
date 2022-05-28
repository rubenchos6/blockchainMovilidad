/**
 * Use this file to configure your truffle project. It's seeded with some
 * common settings for different networks and features like migrations,
 * compilation and testing. Uncomment the ones you need or modify
 * them to suit your project as necessary.
 *
 * More information about configuration can be found at:
 *
 * truffleframework.com/docs/advanced/configuration
 *
 * To deploy via Infura you'll need a wallet provider (like truffle-hdwallet-provider)
 * to sign your transactions before they're sent to a remote public node. Infura accounts
 * are available for free at: infura.io/register.
 *
 * You'll also need a mnemonic - the twelve word phrase the wallet uses to generate
 * public/private key pairs. If you're publishing your code to GitHub make sure you load this
 * phrase from a file you've .gitignored so it doesn't accidentally become public.
 */

/**
 * const HDWalletProvider = require('truffle-hdwallet-provider');
 * const fs = require('fs');
 *
 * const infuraKey = "fj4jll3k.....";
 * const mnemonic = fs.readFileSync(".secret").toString().trim();
 */

/**
 * truffle migrate --reset --network besu
 * truffle console --network besu
 * accounts --> privateKeys
 * const storage = await Storage.deployed()
 * storage
 * strage.set(10)
 * starage.data()
 * const data = await storage.data()
 * data
 */
const PrivateKeyProvider = require("@truffle/hdwallet-provider");

const privateKeys = [
  "0x8f2a55949038a9610f50fb23b5883af3b4ecb3c3bb792cbcefbd1542c692be63",
  "0xc87509a1c067bbde78beb793e6fa76530b6382a4c0241e5e4a9ec0a0f44dc0d3",
  "0xae6ae8e5ccbfb04590405997ee2d52d2b330726137b875053c36d94e974d162f",
  "0x4a9478988575c02bd391857bd1e6e16332ba2f911cad64df4655c1b3625cbda3",
  "0x737ed184bbf74e0550fe56928f0928722a5b149e40fe3f2be864a6752219c8a9",
  "0x1c38d905c0d0f820a447d2221ba39ee6fc3e758cb93620d924244bbec28d28eb",
  "0xdbe816ec26ab9503e05c62968dd1c730717678f1d4ad7dcbef47bb9b6fb88005",
  "0x75a8ce528647b81b772a2b0c87ae065202158eac1c8ab27073336f585befb869",
  "0x64af8882f855e2864b681a13965d9f3b75bf920aa319e0624b9133f672986000",
  "0xbf2b8db243289d3df5e765e65802b4ef1d5f47cde34dcedbc758871dac249796",
  "0xccfad149e4565edae6600c12cf8ba95d90607d21c3231b6aab95c759e2cea961",
  "0xb4c5f2a286d020c4f7c33023c9cbe641434bc6bf9e5a9f6db56f12d1629d1327",
  "0x88f6410d8a14625f1b4fed5d3bbe1a60262e00d30ff353a9061fd58b03bdc2e5",
  "0x0201e368e6a196e9aeb116cb57efcf38fe60452f62e32af20fd4c3397b354f36",
  "0x322058ff3599cbb6d568906c2a8d28c3b011c8741883d3c53da9acce07216f35",
  "0x7cd3c19ea40003d9b192b02abaa51eca31d246aae7301b4424e195001f69bb7f",
  "0x2ed15d6d01b0eb37c8b92b30e9390181b6f1c2f81d5171beb43cc95be3402c20",
  "0x3b5201d15c00b030e19d28058dc055a3e70aba50e1655948ee2535b4a5559128",
  "0xd4a09b68772ab1278e8a9f59cc9f7649605771a4dce59e01ae0c7bc85539ae12",
  "0x54bf68559e8e9fa1f31c94047e76ac156a41001e69252a12b40ddf912e8e0624",
  "0x103eeefb37909e68cc9681284efdd31b0de927cb3a34f939040fecff7f87f271",
  "0xcac4cdb2ac46828cf45842a555626fd2778093a82923bdff00a42c3ccda6e4eb",
  "0x3c5a488721c59adb0be75a639bf7c96bdfda35504771d87f05901252462cd2db",
  "0x5f1601982c8ccfa4b40af20a1e483e71d5fd4446a40df135b036a58722291619",
  "0x4ad9bc5e7d1298cb50c3b98ae0e56058636112096491e7d3e915e7c5abab074a",
  "0x07c20c1a83f470478ccbe173fcf5d4c1a45170bfe9a6ce948ef6f3aec4005f3f",
  "0xf2fbec1af4d1ec1d7a32c332ca5f49c3be16e0a1e07860d634c99f4b9a61e723",
  "0xa662ac253c1bec7eb6e1298c9808f300591869fc2f7e6b428055b5e8d513e1ec",
  "0xa82e34e2572fa9354ce815ff2feeab68f71ada55daca3ba144fec8790c66dcba",
  "0x61fa56c630cae3b73b97fbb3b76c1afaf71418a468e92dca3c19c67ed0cc59d0",
  "0x42adb13a651a915adec258cc2bbb02612895ba804004cb9a2645818dddf41e45",
  "0x6bd493bd7508779eeb74f6e99be9ae6b15f01183d0991e8bbd8dd8cf44da75f1",
  "0x23b11520e026805ebf6ab77d1f7b8e1a854a0f0454c2b7cc0280cb223a506566",
  "0x20c67fbf6575f02f7ab4054ea64c1318b7118bd9272d4e8fb69cb6ee475ed2a0",
  "0xb4e7c212b9f4bbde21a2bfd13bb8626efec18e90f48c4ff2236d1e945cc4c0da",
  "0x50ce112fbf9212966f6b7959b822c360c015c0600aec99f25b6c20ea9490870c",
  "0x08fac2e4961cf3374731aea078d5d16f6a84c611e8f025ede1209180968441a8",
  "0xdf21e78b4fe0519fa35123c7e6d98eae61ce8a21b3af0080529c0585506e3794",
  "0xab7fe2cbab9ead77e94ffe9801c702c5d2a46a62f14284175611c04dd6930dba",
  "0x8764972fbc0fae9d54112e9e043af3206a0425d87b2739d795d02aab03634fab",
  "0x6f1ae050272ea2908615b2fd6318b549c9187fee0ad9c23ed71589645c76a040",
  "0x1c767acf3ff0b9f0f4412563581aa540b7ab3dffb3fe010937a77e4cfa91a088",
  "0x58e5f61b8aa245592329144640c262020a70adee437745c2887ee6e294b388c5",
  "0x665473c81f23e4ea1e892244e0cd742628424e432fe5de1efa9a08a4dd9a7afd",
  "0x7f51b00657d2961e544e20096b72f10687c56e490bb1e78e5ac466273de9394d",
  "0xd419ece6153645b703d5b499c74460e391de3c8fa74fd1c76f9024e0175b7f75",
  "0xb56de21c2051caa5795b802a6722f6c569bcdb05461a8f3cc65d623c109e50fd",
  "0x742c360a5864a567dfa0625b38dfc89add489d4ca1c0311971471dfe47b52803",
  "0xf38baac7b1cad64568013c1511bfa35f83a6689603bcf62336d2687ae1f6be5b",
  "0x6ba2981312a1756135cb2e53cecbbd8be506c24244bd82dc81a1ebb749d0ab0a",
  "0x52c181413a4d83cd18368d425b30af67885e872f9e314aec785c00aac638b6ea",
  "0xb88ef9bc1fd8fc7350e6a7e830c83b1dc4b897f3751a97e4c4f44a6189829d81",
  "0xf1185424aed7b1be08a523a963d70414f9f448833e43178d2a2ddef7a4c1c986",
  "0x9b295932965c36269ba1d2339d7f91f91ea2dee07fea07de8ad49d7cab08e386",
  "0x212595cf55adafd4b6bf606a0a385649649447ddb5b516ea5fba45ca199539cf",
  "0xcfcce0c0c9d7fa59ae427bbeb77ea86c3684f9e2be7c88714b1bd1405bb7168a",
  "0x521e26512a904d56b7890cd7619e18d478d01491247ccb954a006c1455de2ed2",
  "0x9090739cf6577239f1be0892b96afbc62b57938c6412d43fc42cac3c00da19b9",
  "0x2b0c2c892d7bcc2f94813e9eccd0b88bc2f57fa66e26da5da0d4f8d22b020b9f",
  "0xc62eb49f1ff10f93ac8125907594656d09c130151597f836c6aec5d1f5f0586a",
  "0x116f3e0779b1dffc51c6c52b748114d4465a1914df176c4886a63605dedd015f",
  "0x290ba5cb9af6ba796c08be40b00662b5cc97773681b74b1b74e87150ed4b0fc1",
  "0x7d22fe7b1344a215a509fd0390d13c9c8355be869bbb2013c450fa76f0b836b6",
  "0x1b5f6b7ac6612dfb9d9fc85c8c5c301b78cb5f09150a83610582418c80225195",
  "0xa6e8bc6cae4f79a43dd4cabdeef30f035e539055a2fc0403a027e2b10cb50097",
  "0xd81905438eee365b1c9ffaf7c147996ce76d33df1aa943a1cbb1e0ac99ac4865",
  "0x5d6e5a08f1e1253b3ca07965297116dc68fe58270e7c092bf812248c90cb62fb",
  "0x30a2f1a2b3c78d447590803ae4f369105525ccdab37af4dc9cf4bc46225247a1",
  "0x942f567f8fddbf5bc23ba0a037edb540563adedba55da9fed197272c944ac571",
  "0x46272de04000974a0f4e85f122dd987b35044bb8af58c0d1a2a3a75dc7b40225",
  "0x251fec049089466d567cd366bf31bb9788383aa2279b3907826e8582d8df3f0e",
  "0x424475d40e380a28cbd5e1616d18ee224cda2b51d06d54da6810962860217f9c",
  "0x1f4e6271f9fe6a3119075c729fe56fed9f27bb44594acd2b2b4b3faf633851ff",
  "0x0536051f26071e7a133ab11c8d084c887e70440bf287bd0daca7cdebd7f77f53",
  "0x0c7e1a4d76a3a676b9e767e9d78f4d340ebd44bd7dd9373227136470e99f9b8d",
  "0xf0d2180262f382f1a6ea799726cc5ae1927944faf36f548e607b13d29bba3ce2",
  "0xf7851afd11454eb8002e776e5b79dabd596236e6f76b6cecff357da0b50ff2cb",
  "0xf0b6e774c9b3596b754ad4ef0fa9555bf200602b72cac28b165979919888a987",
  "0xe12ecb20d405fba9c970ac14e9d98bf9ce70d9fdadba32d8d45a9db464406a0b",
  "0xea69141816e5beaa4fca13c86afb68d51da026f2819996c3dfdb5dc6f8f44ab1",
  "0x6ff6871ca5494a7de172b587db48a3dfba1dd9970a71292af109cd0d4791ee45",
  "0x9cbb6ce885297b1a68520751bde08eebb9992ec72cc087591def6dc23dd91c2e",
  "0x94a58acfb091f9dfc8910b74a66c6d6b45940d8e691bafd8e98af911df32bb03",
  "0xb484ec96e0bca6d0e1aad41ad9d284807e383996ca4d0ca0015df5af0bc25417",
  "0x51ecdd75a40c980ecb2e74ec1279954a44943b841329f4b6c77256685c5fbc1e",
  "0xf2dc4628aa6eb8e2c6aa2918c5baa1bc7588fa080eab58e714029c3cac6bf5a9",
  "0x76526a80a727dc954d6004fec59d032acb9a42a4502ceea7bff555e8c97a780b",
  "0x3db663bda4d452474a798a8d449f4066966da53989f31c24183ff31ea554753b",
  "0xdb6cb9636a4aad8f048268fea088493d8036420b0b84b49d1c4d325f62a3ab35",
  "0x5f933c9af6fe3081cd653ff3088d5ece3483cb0ced2c948d794fc3161b44f2dc",
  "0x49527952203f3c62072713cd3a2cc11758897f001bbdad17fe30a2529363d7bb",
  "0x5114fa619e11eaa36eeb03237f94a03a83d43ce46374728b02ee59a30b1fa0b2",
  "0xbec9069009d0442ce8ed6beaabbcc46297c1c37613549b26d003ffc86cc1f024",
  "0x517e95aab236dafe6b3742cc2f6f86c625b255408cf7c625638b685018d34078",
  "0x7d66da18d60df68797ca9c360d87539228ca97d6a8ce0ca8223ec56bd6dffc81",
  "0x1e9fcfa9d8f5fac041bd029bffde3f37d82dc744f00b6645b150d30b66f0bd2d",
  "0xaa9df93755a96fbe2080cbebdac03c98a854a9b646d9b4e79d26c4d544982c42",
  "0xd958ed992cb34d59fdeddc7848bae59d8294f516efaed87dbb8dc0c90482c9de",
  "0x9e46e9ef2fb4429e657dec35df3c336552c331b130e89a8c418378dd792a7ede",
  "0x610cc115facb2ad910c220bca7b3cd67f93319bdc1fad544f44617979b38fdb9"
];

const privateKeyProvider = new PrivateKeyProvider(
  privateKeys,
  "http://localhost:8545",
  0,
  100
);

module.exports = {
  /**
   * Networks define how you connect to your ethereum client and let you set the
   * defaults web3 uses to send transactions. If you don't specify one truffle
   * will spin up a development blockchain for you on port 9545 when you
   * run `develop` or `test`. You can ask a truffle command to use a specific
   * network from the command line, e.g
   *
   * $ truffle test --network <network-name>
   */

  networks: {
    /**
     * Useful for testing. The `development` name is special - truffle uses it by default
     * if it's defined here and no other network is specified at the command line.
     * You should run a client (like ganache-cli, geth or parity) in a separate terminal
     * tab if you use this network and you must also set the `host`, `port` and `network_id`
     * options below to some value.
     */

    development: {
      host: "127.0.0.1",
      port: 8545,
      network_id: "*",
    },

    besu: {
      provider: privateKeyProvider,
      network_id: "*",
    },

    // Another network with more advanced options...
    /*     advanced: {
      port: 8777,             // Custom port
      network_id: 1342,       // Custom network
      gas: 8500000,           // Gas sent with each transaction (default: ~6700000)
      gasPrice: 20000000000,  // 20 gwei (in wei) (default: 100 gwei)
      from: '<address>',        // Account to send txs from (default: accounts[0])
      websockets: true        // Enable EventEmitter interface for web3 (default: false)
    }, */

    // Useful for deploying to a public network.
    // NB: It's important to wrap the provider as a function.
    /*     ropsten: {
      provider: () => new HDWalletProvider(mnemonic, `https://ropsten.infura.io/v3/YOUR-PROJECT-ID`),
      network_id: 3,       // Ropsten's id
      gas: 5500000,        // Ropsten has a lower block limit than mainnet
      confirmations: 2,    // # of confs to wait between deployments. (default: 0)
      timeoutBlocks: 200,  // # of blocks before a deployment times out  (minimum/default: 50)
      skipDryRun: true     // Skip dry run before migrations? (default: false for public nets )
    }, */

    // Useful for private networks
    /*     private: {
      provider: () => new HDWalletProvider(mnemonic, `https://network.io`),
      network_id: 2111,   // This network is yours, in the cloud.
      production: true    // Treats this network as if it was a public net. (default: false)
    } */
  },

  // Set default mocha options here, use special reporters etc.
  mocha: {
    timeout: 100000,
  },

  // Configure your compilers
  compilers: {
    solc: {
      version: "0.5.0", // Fetch exact version from solc-bin (default: truffle's version)
      // docker: true,        // Use "0.5.1" you've installed locally with docker (default: false)
      // settings: {          // See the solidity docs for advice about optimization and evmVersion
      //  optimizer: {
      //    enabled: false,
      //    runs: 200
      //  },
      //  evmVersion: "byzantium"
      // }
    },
  },
};
