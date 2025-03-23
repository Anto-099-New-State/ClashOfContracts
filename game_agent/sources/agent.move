module 0xb2b3c13664b3ccdd0e4d2a44bb3b7da552f69540239fd88db1175765ca5e190e::game_agent {
    use aptos_framework::signer;
    use std::vector;
    
    struct Army has key, store {
        troops: vector<u8>,
        quantities: vector<u64>,
    }
    
    struct Defense has key, store {
        level: u64,
    }
    
    struct ShopItem has key, store {
        item_id: u64,
        price: u64,
    }
    
    public entry fun init_account(owner: &signer) {
        move_to(owner, Army { troops: vector::empty<u8>(), quantities: vector::empty<u64>() });
        move_to(owner, Defense { level: 1 });
    }
    
    public entry fun train_troops(owner: &signer, troop_type: u8, quantity: u64) acquires Army {
        assert!(quantity > 0, 100);
        let account_addr = signer::address_of(owner);
        let army_ref = borrow_global_mut<Army>(account_addr);
        vector::push_back(&mut army_ref.troops, troop_type);
        vector::push_back(&mut army_ref.quantities, quantity);
    }
    
    public entry fun upgrade_defense(owner: &signer) acquires Defense {
        let account_addr = signer::address_of(owner);
        let defense_ref = borrow_global_mut<Defense>(account_addr);
        defense_ref.level = defense_ref.level + 1;
    }
    
    public entry fun buy_item(owner: &signer, item_id: u64, price: u64) {
        move_to(owner, ShopItem { item_id, price });
    }
}