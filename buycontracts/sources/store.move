module 0x0aa32e527d19ef1065469c3159b6f97941dc6338c9668ad0bd09016bc0fd1b98::store {
    use aptos_framework::coin;
    use aptos_framework::signer;
    use aptos_framework::aptos_coin::AptosCoin;

    const TREASURY: address = @0x505bc5da6c599a1c79903c95665ab6fbf46e0071c622d0cc0251b7c78801917e;

    struct Player has key {
        gold: u64
    }

    public entry fun buy_potion(buyer: &signer, cost: u64) acquires Player {
        let buyer_addr = signer::address_of(buyer);
        if (!exists<Player>(buyer_addr)) {
            move_to(buyer, Player { gold: 1000 });
        };

        let player: &mut Player = borrow_global_mut<Player>(buyer_addr);
        assert!(player.gold >= cost, 100);

        player.gold = player.gold - cost;

        let payment = coin::withdraw<AptosCoin>(buyer, cost * 100_000);
        coin::deposit<AptosCoin>(TREASURY, payment);
    }

    public entry fun buy_gold(buyer: &signer, amount: u64) acquires Player {
        let buyer_addr = signer::address_of(buyer);
        if (!exists<Player>(buyer_addr)) {
            move_to(buyer, Player { gold: 1000 });
        };

        let player: &mut Player = borrow_global_mut<Player>(buyer_addr);

        let payment = coin::withdraw<AptosCoin>(buyer, amount * 100_000);
        coin::deposit<AptosCoin>(TREASURY, payment);

        player.gold = player.gold + amount;
    }
}
