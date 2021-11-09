const KaseyCoin = artifacts.require("./KaseyCoin.sol");

contract("KaseyCoin", accounts => {
  let [alice, bob] = accounts;

  it("...should store the value 89.", async () => {
    const kaseyCoinInstance = await KaseyCoin.deployed();

    // Set value of 89
    await kaseyCoinInstance.set(89, { from: alice });

    // Get stored value
    const storedData = await kaseyCoinInstance.get.call();

    assert.equal(storedData, 89, "The value 89 was not stored.");
  });
  it("...should mint 20000 coins upon creation.", async () => {
    const kaseyCoinInstance = await KaseyCoin.deployed();

    storedData = await kaseyCoinInstance.totalSupply();

    assert.equal(storedData, 20000, "The minted value was not 20000, it was" + storedData);
  });
  it("...should allow for transfer between addresses", async () => {
    const kaseyCoinInstance = await KaseyCoin.deployed();
    await kaseyCoinInstance.transfer(bob, 20);
    let bobBalance = await kaseyCoinInstance.balanceOf(bob);
    assert.equal(bobBalance, 20, "Bob successfully received 20 Kasey coins from the contract owner");
  });
  it("...should return the public address of the user", async () => {
    const kaseyCoinInstance = await KaseyCoin.deployed();
    let userAddress = await kaseyCoinInstance.getUserAddress();
    assert.equal(userAddress, kaseyCoinInstance.accounts[0], "The address returned was" + accounts[0]);
  });
});
