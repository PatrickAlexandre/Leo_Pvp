$(document).ready(function() {
    // Navigation logic
    $('.nav-btn').on('click', function() {
        var target = $(this).data('target');
        $('.content').removeClass('active');
        $('#' + target).addClass('active');
    });

    // Initial stats setup
    const defaultStats = {
        vie: 155480,
        mana: 250000,
        intelligence: 5115,
        endurance: 7774,
        critique: '15%',
        hate: '7%',
        maitrise: '5%',
        polyvalence: '4%',
    };

    const stats = JSON.parse(localStorage.getItem('stats')) || defaultStats;
    let userPoints = parseInt(localStorage.getItem('userPoints')) || 0;
    let skills = JSON.parse(localStorage.getItem('skills')) || [];
    let userClass = localStorage.getItem('userClass') || 'Restoration Druid';
    let userLevel = parseInt(localStorage.getItem('userLevel')) || 1;
    let userExp = parseInt(localStorage.getItem('userExp')) || 0;
    let inventory = JSON.parse(localStorage.getItem('inventory')) || [];

    function updateStatsUI() {
        for (const [key, value] of Object.entries(stats)) {
            $('#' + key).text(value);
        }
    }

    function updatePointsUI() {
        $('#user-points').text(userPoints);
    }

    function updateSkillsUI() {
        const skillList = $('#skill-list');
        skillList.empty();
        skills.forEach(skill => {
            skillList.append(`<li>${skill}</li>`);
        });
    }

    function updateClassUI() {
        $('#character-class').text(userClass);
    }

    function updateLevelUI() {
        $('#character-level').text(userLevel);
        $('#character-exp').text(`${userExp} / ${userLevel * 100}`);
    }

    function updateInventoryUI() {
        const inventoryList = $('#inventory-list');
        inventoryList.empty();
        inventory.forEach(item => {
            const itemDiv = $(`<div class="inventory-item" data-item="${item}">`);
            itemDiv.append(`<h3>${item}</h3>`);
            const useButton = $('<button>').text('Use').on('click', function() {
                alert(`You used ${item}!`);
                // Add logic to use the item, e.g., increase stats
            });
            itemDiv.append(useButton);
            inventoryList.append(itemDiv);
        });
    }

    function gainExperience(amount) {
        userExp += amount;
        while (userExp >= userLevel * 100) {
            userExp -= userLevel * 100;
            userLevel++;
            alert('Level up! You are now level ' + userLevel);
        }
        updateLevelUI();
        localStorage.setItem('userExp', userExp);
        localStorage.setItem('userLevel', userLevel);
    }

    updateStatsUI();
    updatePointsUI();
    updateSkillsUI();
    updateClassUI();
    updateLevelUI();
    updateInventoryUI();

    // Editable stats
    $('.edit-stat').on('click', function() {
        const statKey = $(this).data('stat');
        const currentValue = stats[statKey];
        const newValue = prompt(`Enter new value for ${statKey}:`, currentValue);
        if (newValue !== null) {
            stats[statKey] = newValue;
            $('#' + statKey).text(newValue);
            localStorage.setItem('stats', JSON.stringify(stats));
        }
    });

    // Remove Specialisations setup and switch logic

    // Combat logic with visual effects and sound
    $('#start-combat').on('click', function() {
        const combatLog = $('#combat-log');
        combatLog.empty();
        let enemyHealth = 10000;
        const playerAttack = parseInt(stats.intelligence) * 10;
        let combatRounds = 0;
        let difficulty = $('#difficulty-select').val();
        let pointsEarned = 0;
        let expEarned = 0;

        // Adjust combat parameters based on difficulty
        if (difficulty === 'easy') {
            enemyHealth = 8000;
            pointsEarned = 50;
            expEarned = 50;
        } else if (difficulty === 'medium') {
            enemyHealth = 10000;
            pointsEarned = 100;
            expEarned = 100;
        } else if (difficulty === 'hard') {
            enemyHealth = 15000;
            pointsEarned = 200;
            expEarned = 150;
        }

        const attackAnimation = $('<div class="attack-animation">').text('Attack!');
        $('body').append(attackAnimation);
        $('#attack-sound')[0].play();
        attackAnimation.fadeIn(200).fadeOut(200, function() {
            $(this).remove();
        });

        while (enemyHealth > 0) {
            combatRounds++;
            const damage = playerAttack + Math.floor(Math.random() * 100);
            combatLog.append(`<p>Round ${combatRounds}: You dealt ${damage} damage!</p>`);
            enemyHealth -= damage;
        }
        combatLog.append('<p>You defeated the enemy!</p>');
        userPoints += pointsEarned;
        gainExperience(expEarned);
        updatePointsUI();
        localStorage.setItem('userPoints', userPoints);
    });

    // Shop logic
    $('.buy-item').on('click', function() {
        const item = $(this).parent().data('item');
        const itemPrice = parseInt($(this).parent().data('price'));
        if (userPoints >= itemPrice) {
            userPoints -= itemPrice;
            if (item === 'sword' || item === 'shield' || item === 'potion') {
                inventory.push(item);
                updateInventoryUI();
                localStorage.setItem('inventory', JSON.stringify(inventory));
                alert(`You purchased a ${item}!`);
            } else {
                skills.push(item);
                updateSkillsUI();
                localStorage.setItem('skills', JSON.stringify(skills));
                alert(`You learned the ${item} skill!`);
            }
            updatePointsUI();
            localStorage.setItem('userPoints', userPoints);
        } else {
            alert('Not enough points!');
        }
    });

    // Quest logic with sound
    $('.start-quest').on('click', function() {
        const questReward = parseInt($(this).parent().data('reward'));
        alert('Quest started!');
        $('#quest-sound')[0].play();
        gainExperience(questReward);
    });

    // Class selection logic
    $('.select-class').on('click', function() {
        userClass = $(this).parent().data('class');
        localStorage.setItem('userClass', userClass);
        alert(`You selected ${userClass} class!`);
        updateClassUI();

        // Update initial stats based on selected class
        if (userClass === 'Warrior') {
            stats.vie = 200000;
            stats.mana = 50000;
            stats.intelligence = 3000;
            stats.endurance = 10000;
            stats.critique = '20%';
            stats.hate = '5%';
            stats.maitrise = '10%';
            stats.polyvalence = '6%';
        } else if (userClass === 'Mage') {
            stats.vie = 120000;
            stats.mana = 300000;
            stats.intelligence = 8000;
            stats.endurance = 6000;
            stats.critique = '15%';
            stats.hate = '10%';
            stats.maitrise = '8%';
            stats.polyvalence = '4%';
        } else if (userClass === 'Rogue') {
            stats.vie = 140000;
            stats.mana = 100000;
            stats.intelligence = 5000;
            stats.endurance = 8000;
            stats.critique = '25%';
            stats.hate = '15%';
            stats.maitrise = '7%';
            stats.polyvalence = '5%';
        }
        updateStatsUI();
        localStorage.setItem('stats', JSON.stringify(stats));
    });
});
