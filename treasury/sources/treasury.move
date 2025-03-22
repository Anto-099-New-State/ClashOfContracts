module 0x505bc5da6c599a1c79903c95665ab6fbf46e0071c622d0cc0251b7c78801917e::treasury {
    use aptos_framework::coin;
    use aptos_framework::signer;
    use aptos_framework::aptos_coin::AptosCoin;

    struct Treasury has key {
        balance: u64
    }

    public entry fun initialize(admin: &signer) {
        let admin_addr = signer::address_of(admin);
        assert!(!exists<Treasury>(admin_addr), 100);
        move_to(admin, Treasury { balance: 0 });
    }

    public entry fun deposit(_from: &signer, amount: u64) acquires Treasury {
        let treasury_addr = @0x505bc5da6c599a1c79903c95665ab6fbf46e0071c622d0cc0251b7c78801917e; 
        let payment = coin::withdraw<AptosCoin>(_from, amount);
        coin::deposit<AptosCoin>(treasury_addr, payment);

        let treasury: &mut Treasury = borrow_global_mut<Treasury>(treasury_addr);
        treasury.balance = treasury.balance + amount;
    }

    public entry fun withdraw(admin: &signer, recipient: address, amount: u64) acquires Treasury {
        let treasury_addr = signer::address_of(admin);
        assert!(exists<Treasury>(treasury_addr), 101); 
        assert!(treasury_addr == @0x505bc5da6c599a1c79903c95665ab6fbf46e0071c622d0cc0251b7c78801917e, 102);

        let treasury: &mut Treasury = borrow_global_mut<Treasury>(treasury_addr);
        assert!(treasury.balance >= amount, 103); 

        let payment = coin::withdraw<AptosCoin>(admin, amount);
        coin::deposit<AptosCoin>(recipient, payment);

        treasury.balance = treasury.balance - amount;
    }

    public fun get_balance(): u64 acquires Treasury {
        let treasury_addr = @0x505bc5da6c599a1c79903c95665ab6fbf46e0071c622d0cc0251b7c78801917e;
        let treasury: &Treasury = borrow_global<Treasury>(treasury_addr);
        treasury.balance
    }
}
