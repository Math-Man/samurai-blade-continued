# Samurai's Blade Mod for Binding of Isaac Repentance

samurai-blade is a mod for _[The Binding of Isaac: Repentance](https://store.steampowered.com/app/1426300/The_Binding_of_Isaac_Repentance/)_, written in [TypeScript](https://www.typescriptlang.org/) using the [IsaacScript](https://isaacscript.github.io/) framework.

### A familiar sword from a well-known samurai can now be found in the basement

##### (Yes, it is Muramasa from Metal Gear Rising)

##### This mod is still in early stages, it works but there are many features and synergies I want to eventually add, there might also be _BUGS_. Also it's possible that the item might be severely unbalanced, I haven't had enough time to play test sadly.

This mod only adds a single item called `Samurai's Blade` which can be found as a boss drop. Picking up This item changes Isaac's attack to a unique melee weapon.

`Samurai's Blade` has direct and indirect synergies with most of vanilla and dlc items, so there is a lot to discover.

Although `Samurai's Blade` has stats of its own, all of its stats are modified by player's own stats.

<img src="media/p2.gif" width=100%>

<details>
  <summary>
    Player stats and what they effect (Spoilers?)
  </summary>

- Damage: Directly modifies damage by a factor of player's damage.
- Fire Delay: Higher fire rate reduces delay between swings.
- Shot speed: Higher shot speed reduces time required for blade to be charged.
- Range, Shot height etc.: Increases blade's arc size.
- Luck : Increases critical hit chance. (For now this is a simple damage increase)

</details>

<br/>

<details>
  <summary>
    All current synergies (Spoilers?)
  </summary>

- All items/trinkets that give tear flags works!
- Items that increase tear count increases the number of hits done by blade each swing.
- Player's stats have direct impact on blade's behavior.

</details>

#### Known Issues

- Pretty much all complex synergies are missing apart from ones that increase tear count.

### Implementation Notes

This was my first attempt at modding BOI. It started out in LUA and I made the switch after discovering that isaac-script exists.
If the code looks strange that is the reason, also I was not familiar with Typescript before this project so, yeah 😄.

#### Synergy Mechanics

BOI has a lot items and I mean A LOT OF ITEMS. Unfortunately I don't have time or patience to implement synergy for all of these items at once. So, I've taken a shortcut.

##### Tearflag Synergies

Every instance of damage done by the blade spawns a hidden tear with all tearflags of the player and with a reduced base damage multiplier, essentially unevenly splitting all damage dealt between the blade itself and tear and tearflag effects. Although this is extremely hacky, pretty much all tear flags are successfully handled by doing this.

The only problem remaining is the VFX and SFX of the tear. To handle this I've simply switched tear type to the tear that is spawned by the spirit sword which has very minimal amount of effects and doesn't look out of place when combined with items like `Cricket's Body`.

##### Complex Synergies

To handle complex synergies, the behavior needs to be injected into the flow of the game without breaking the unique behavior of the item. One such complex synergy is with the items that increase the number of shots isaac shoots every attack. There is no 'right' way of handling this synergy so I've simply increased the number of hits the blade attack can do to an enemy for every hit, this doesn't just effect the damage but the things such as knockback as well. I think this simulates the mechanical multiplier of these items almost perfectly.

#### Credits

- Base sound effects are from [Ultimate Sound FX Bundle](https://assetstore.unity.com/packages/audio/sound-fx/ultimate-sound-fx-bundle-151756).
- Art by [Von Duckling](https://steamcommunity.com/profiles/76561197999025384/).
- Metal Gear series and Metal Gear Rising owned by Konami Holdings Corporation
