import { useState } from 'react'
import './styles.css'
import './Generator.css'
import ancestry_data from './data/ancestry_table.json' assert {type: 'json'}
import background_data from './data/background_table.json' assert {type: 'json'}
import class_data from './data/class_table.json' assert {type: 'json'}

function IntField({name, value, onMinus, onPlus}){
    return(
        <div className="int-field-row">
            <p>{name}</p>
            <button className="increment" onClick={onMinus}>-</button>
            <p>{value}</p>
            <button className="increment" onClick={onPlus}>+</button>
        </div>
    )
}


function WeightSection({name, commonWeight, cwDown, cwUp, uncommonWeight, uwDown, uwUp, rareWeight, rwDown, rwUp}){
    return(
        <div>
            <h2>{name}</h2>
            <IntField name="Common Weight" value={commonWeight} onMinus={cwDown} onPlus={cwUp}/>
            <IntField name="Uncommon Weight" value={uncommonWeight} onMinus={uwDown} onPlus={uwUp}/>
            <IntField name="Rare Weight" value={rareWeight} onMinus={rwDown} onPlus={rwUp}/>
        </div>
    )
}

function Result({ancestry, background, class_p}){
    const ancestry_link = ancestry==null? "https://2e.aonprd.com/Ancestries.aspx" : "https://2e.aonprd.com"+ancestry.url
    const background_link = ancestry==null? "https://2e.aonprd.com/Backgrounds.aspx.aspx" : "https://2e.aonprd.com"+background.url
    const class_link = ancestry==null? "https://2e.aonprd.com/Classes.aspx" : "https://2e.aonprd.com"+class_p.url
    

        return (
        <div>
            <h2>Result</h2>

            <p>Ancestry</p>
            <ul>
                <li>
                    <a href={ancestry_link}>{ancestry==null? "None" :ancestry.name}</a>
                </li>
                <li>
                    <p>HP: {ancestry==null? "None" :ancestry.hp}</p>
                </li>
                <li>
                    <p>Ability boosts: {ancestry==null? "None" :ancestry.ability_boost}</p>
                </li>
                <li>
                    <p>Ability flaws: {ancestry==null? "None" :ancestry.ability_flaw}</p>
                </li>
                <li>
                    <p>Summary: {ancestry==null? "None" :ancestry.summary}</p>
                </li>
            </ul>


            <p>Background</p>
            <ul>
                <li>
                    <a href={background_link}>{background==null? "None" :background.name}</a>
                </li>
                <li>
                    <p>Abilities: {background==null? "None" :background.ability}</p>
                </li>
                <li>
                    <p>Skill: {background==null? "None" :background.skill}</p>
                </li>
                <li>
                    <p>Feats: {background==null? "None" :background.feat}</p>
                </li>
                <li>
                    <p>Summary: {background==null? "None" :background.summary}</p>
                </li>
            </ul>

            <p>Class</p>
            <ul>
                <li>
                    <a href={class_link}>{background==null? "None" :class_p.name}</a>
                </li>
                <li>
                    <p>Ability: {class_p==null? "None" :class_p.ability}</p>
                </li>
                <li>
                    <p>HP: {class_p==null? "None" :class_p.hp}</p>
                </li>
                <li>
                    <p>Summary: {class_p==null? "None" :class_p.summary}</p>
                </li>
            </ul>
        </div>
        )
    }

export default function Generator(){
    const [ancestry_result, set_ancestry_result] = useState(null)
    const [background_result, set_background_result] = useState(null)
    const [class_result, set_class_result] = useState(null)
    

    const [ancestry_common_weight, set_ancestry_common_weight] = useState(1)
    const [ancestry_uncommon_weight, set_ancestry_uncommon_weight] = useState(1)
    const [ancestry_rare_weight, set_ancestry_rare_weight] = useState(1)

    const [background_common_weight, set_background_common_weight] = useState(1)
    const [background_uncommon_weight, set_background_uncommon_weight] = useState(1)
    const [background_rare_weight, set_background_rare_weight] = useState(1)

    const [class_common_weight, set_class_common_weight] = useState(1)
    const [class_uncommon_weight, set_class_uncommon_weight] = useState(1)
    const [class_rare_weight, set_class_rare_weight] = useState(1)

    function handleClick(type, rarity, direction){
        switch(type){
            case "ancestry":
                switch(rarity){
                    case "common" :
                        set_ancestry_common_weight(Math.max(ancestry_common_weight + direction, 0))
                        break;
                    case "uncommon" :
                        set_ancestry_uncommon_weight(Math.max(ancestry_uncommon_weight + direction, 0))
                        break;
                    case "rare" :
                        set_ancestry_rare_weight(Math.max(ancestry_rare_weight + direction, 0))
                        break;
                }
                break;
            case "background":
                switch(rarity){
                    case "common" :
                        set_background_common_weight(Math.max(background_common_weight + direction, 0))
                        break;
                    case "uncommon" :
                        set_background_uncommon_weight(Math.max(background_uncommon_weight + direction, 0))
                        break;
                    case "rare" :
                        set_background_rare_weight(Math.max(background_rare_weight + direction, 0))
                        break;
                }
                break;
            case "class":
                switch(rarity){
                    case "common" :
                        set_class_common_weight(Math.max(class_common_weight + direction, 0))
                        break;
                    case "uncommon" :
                        set_class_uncommon_weight(Math.max(class_uncommon_weight + direction, 0))
                        break;
                    case "rare" :
                        set_class_rare_weight(Math.max(class_rare_weight + direction, 0))
                        break;
                }
                break;
        }
    }


    function generate_ancestry(){
        var ancestry_sum = 0;
        var with_weight = []

        for (let i = 0; i < ancestry_data.length; i++){
            switch (ancestry_data[i].rarity){
                case "Common" :
                    ancestry_sum+=ancestry_common_weight
                    if (ancestry_common_weight>0) with_weight.push(i)
                    break;
                case "Uncommon" :
                    ancestry_sum+=ancestry_uncommon_weight
                    if (ancestry_uncommon_weight>0) with_weight.push(i)
                    break;
                case "Rare" :
                    ancestry_sum+=ancestry_rare_weight
                    if (ancestry_rare_weight>0) with_weight.push(i)
                    break;
            }
        }

        var weight_i = 0
        var weight_id = 0
        var rand = Math.floor(Math.random()*ancestry_sum)

        while (weight_i <= rand){
            switch (ancestry_data[with_weight[weight_id]].rarity){
                case "Common" :
                    weight_i+=ancestry_common_weight
                    break;
                case "Uncommon" :
                    weight_i+=ancestry_uncommon_weight
                    break;
                case "Rare" :
                    weight_i+=ancestry_rare_weight
                    break;
            }
            weight_id++
        }
        weight_id--

        set_ancestry_result(ancestry_data[with_weight[weight_id]])
    }

    function generate_background(){
        var background_sum = 0;
        var with_weight = []

        for (let i = 0; i < background_data.length; i++){
            switch (background_data[i].rarity){
                case "Common" :
                    background_sum+=background_common_weight
                    if (background_common_weight>0) with_weight.push(i)
                    break;
                case "Uncommon" :
                    background_sum+=background_uncommon_weight
                    if (background_uncommon_weight>0) with_weight.push(i)
                    break;
                case "Rare" :
                    background_sum+=background_rare_weight
                    if (background_rare_weight>0) with_weight.push(i)
                    break;
            }
        }

        var weight_i = 0
        var weight_id = 0
        var rand = Math.floor(Math.random()*background_sum)

        while (weight_i <= rand){
            switch (background_data[with_weight[weight_id]].rarity){
                case "Common" :
                    weight_i+=background_common_weight
                    break;
                case "Uncommon" :
                    weight_i+=background_uncommon_weight
                    break;
                case "Rare" :
                    weight_i+=background_rare_weight
                    break;
            }
            weight_id++
        }
        weight_id--

        set_background_result(background_data[with_weight[weight_id]])
    }

    function generate_class(){
        var class_sum = 0;
        var with_weight = []

        for (let i = 0; i < class_data.length; i++){
            switch (class_data[i].rarity){
                case "Common" :
                    class_sum+=class_common_weight
                    if (class_common_weight>0) with_weight.push(i)
                    break;
                case "Uncommon" :
                    class_sum+=class_uncommon_weight
                    if (class_uncommon_weight>0) with_weight.push(i)
                    break;
                case "Rare" :
                    class_sum+=class_rare_weight
                    if (class_rare_weight>0) with_weight.push(i)
                    break;
            }
        }

        var weight_i = 0
        var weight_id = 0
        var rand = Math.floor(Math.random()*class_sum)

        while (weight_i <= rand){
            switch (class_data[with_weight[weight_id]].rarity){
                case "Common" :
                    weight_i+=class_common_weight
                    break;
                case "Uncommon" :
                    weight_i+=class_uncommon_weight
                    break;
                case "Rare" :
                    weight_i+=class_rare_weight
                    break;
            }
            weight_id++
        }
        weight_id--

        set_class_result(class_data[with_weight[weight_id]])
    }

    function generate(){
        if(ancestry_common_weight+ancestry_uncommon_weight+ancestry_rare_weight > 0) generate_ancestry()
        if(background_common_weight+background_uncommon_weight+background_rare_weight > 0) generate_background()
        if(class_common_weight+class_uncommon_weight+class_rare_weight > 0) generate_class()
    }

    

    return(
        <section id="generator-body">
            <div id="input">
            <WeightSection 
                name="Ancestry rarity weights" 
                commonWeight={ancestry_common_weight} 
                uncommonWeight={ancestry_uncommon_weight} 
                rareWeight={ancestry_rare_weight} 
                cwDown={() => handleClick("ancestry", "common", -1)}
                cwUp={() => handleClick("ancestry", "common", 1)}
                uwDown={() => handleClick("ancestry", "uncommon", -1)}
                uwUp={() => handleClick("ancestry", "uncommon", 1)}
                rwDown={() => handleClick("ancestry", "rare", -1)}
                rwUp={() => handleClick("ancestry", "rare", 1)}
                />
            
            <WeightSection 
                name="Background rarity weights" 
                commonWeight={background_common_weight} 
                uncommonWeight={background_uncommon_weight} 
                rareWeight={background_rare_weight}
                cwDown={() => handleClick("background", "common", -1)}
                cwUp={() => handleClick("background", "common", 1)}
                uwDown={() => handleClick("background", "uncommon", -1)}
                uwUp={() => handleClick("background", "uncommon", 1)}
                rwDown={() => handleClick("background", "rare", -1)}
                rwUp={() => handleClick("background", "rare", 1)}/>
            
            <WeightSection 
                name="Class rarity weights" 
                commonWeight={class_common_weight} 
                uncommonWeight={class_uncommon_weight} 
                rareWeight={class_rare_weight}
                cwDown={() => handleClick("class", "common", -1)}
                cwUp={() => handleClick("class", "common", 1)}
                uwDown={() => handleClick("class", "uncommon", -1)}
                uwUp={() => handleClick("class", "uncommon", 1)}
                rwDown={() => handleClick("class", "rare", -1)}
                rwUp={() => handleClick("class", "rare", 1)}/>
            
            <button className="my_button" onClick={() => generate()}>Generate</button>
        </div>
        <Result ancestry={ancestry_result} background={background_result} class_p={class_result}/>
        </section>
        
    )
}