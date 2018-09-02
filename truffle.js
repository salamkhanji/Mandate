module.exports = {
  // See <http://truffleframework.com/docs/advanced/configuration>
  // for more about customizing your Truffle configuration!
  networks: {
    development: {
      host: "127.0.0.1",
      port: 8545,
      from: "0x2E520E397ec748458947fA0402EBD444db686c5a",
      network_id: "*" // Match any network id
    }
  }
};
