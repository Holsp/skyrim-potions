import { NextPage } from 'next';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Router from 'next/router';
import React, { SetStateAction, useEffect, useState } from 'react';
import styles from '../styles/Crafter.module.scss';
import { render } from 'node-sass';
import { resolve } from 'path';
import { rejects } from 'assert';

const Crafter: NextPage = () => {


    interface JsonInterface {
        effects: string[];
        ingredients: {
            effects?: string[];
            image?: string;
            value?: number;
            name?: string;
            weight?: number;
        }
    }
    interface IngredientsInterface {
        effects: string[];
        image?: string;
        value?: number;
        name: string;
        weight?: number;

    }

    const [ingredients, setIngredients] = useState<IngredientsInterface[]>([]);
    const [effects, setEffects] = useState<string[]>([]);

    const [one, setOne] = useState<IngredientsInterface | undefined>(undefined);
    const [two, setTwo] = useState<IngredientsInterface | undefined>(undefined);
    const [three, setThree] = useState<IngredientsInterface | undefined>(undefined);

    //let sharedIngredients: string[] = [];
    const [sharedIngredients, setSharedIngredients] = useState<string[]>([]);

    useEffect(() => {
        // fetch('data/alchemy.json', {
        //     headers: {
        //         'Content-Type': 'application/json',
        //         'Accept': 'application/json'
        //     }
        // })
        //     .then(response => {
        //         return response.json();
        //     })
        //     .then(myJson => {
        //         setIngredients(myJson.ingredients);
        //         setEffects(myJson.effects);
        //     });
        fetchData()
        console.log({one, two, three})
    }, []);

    const fetchData = async () => {
        const response = await fetch('data/alchemy.json', {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        })
        const myJson = await response.json()
        setIngredients(myJson.ingredients);
        setEffects(myJson.effects);
    }

    useEffect(() => {
        console.log({one, two, three})
        console.log({one});
        // @ts-ignore
        const currentEffects: string[] = [...one?.effects ?? [], ...two?.effects ?? [], ...three?.effects ?? []];
        //setCurrentEffects([]);
        // one?.effects?.forEach(item => {
        //     currentEffects.push(item);
        // });
        // two?.effects?.forEach(item => {
        //     currentEffects.push(item);
        // });
        // three?.effects?.forEach(item => {
        //     currentEffects.push(item);
        // });
        //two?.effects?.map(item => setCurrentEffects(i => [...i, item]));
        //three?.effects?.map(item => setCurrentEffects(i => [...i, item]));
        console.log(currentEffects);

        effects.forEach(e => {
            //const num = currentEffects.filter((item) => (item == e)).length;

            const num = currentEffects.reduce((value, item) => {
                return (item === e) ? value + 1 : value;
            }, 0);
            if (num >= 2) {
                setSharedIngredients(oldArray => [...oldArray, e]);
            }

        });
    }, [one, two, three])



    let ing;


    if (effects !== undefined) {
        ing = ingredients.map((item: any, key: any) => <option value={item.name} key={key}>{item.name}</option>)
        console.log(ing);
    }




    const selectOne = async (e: React.ChangeEvent<HTMLSelectElement>) => {
        setOne(await ingredients.find(item => {
            console.log(item.name === e.target.value, item.name, e.target.value)
            return item.name === e.target.value
        }));
        //bruh();
    }
    const selectTwo = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setTwo(ingredients.find(item => item.name === e.target.value));

    }
    const selectThree = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setThree(ingredients.find(item => item.name === e.target.value));
    }


    //When one, two or three updates. Execute this function
    async function bruh() {
        console.log({one});
        const currentEffects: string[] = [];
        //setCurrentEffects([]);
        one?.effects?.forEach(item => {
            currentEffects.push(item);
        });
        two?.effects?.forEach(item => {
            currentEffects.push(item);
        });
        three?.effects?.forEach(item => {
            currentEffects.push(item);
        });
        //two?.effects?.map(item => setCurrentEffects(i => [...i, item]));
        //three?.effects?.map(item => setCurrentEffects(i => [...i, item]));
        console.log(currentEffects);

        effects.forEach(e => {
            //const num = currentEffects.filter((item) => (item == e)).length;

            const num = currentEffects.reduce((value, item) => {
                return (item === e) ? value + 1 : value;
            }, 0);
            if (num >= 2) {
                setSharedIngredients(oldArray => [...oldArray, e]);
            }

        });
    }



    function log() {
        //console.log(data);
        //console.log(effects);
        //console.log(ingredients);
        console.log(one?.effects);
        console.log(two?.effects);
        console.log(three?.effects);
    }

    function bruhTwo() {
        
        console.log(sharedIngredients);
    }

    const [test, setTest] = useState<string>();

    function testFun() {
        setTest("Hello");
        console.log(test);
    }

    return (
        <div>
            <Head>
                <title>Skyrim alchemy</title>
            </Head>
            <button onClick={() => bruh()}>Get data</button>
            <button onClick={() => bruhTwo()}>Get data</button>
            <button onClick={() => testFun()}>Get data</button>

            <div className={styles.wrappers}>
                {JSON.stringify(one)}
                {test}
                <h2>Ingredients</h2>
                <div className={styles.wrapper}>
                    <select onChange={(e) => setOne(ingredients.find(item => item.name === e.target.value))}>
                        <option></option>
                        {ing}
                    </select>
                    <p>+</p>
                    <select onChange={(e) => selectTwo(e)}>
                        <option></option>
                        {ing}
                    </select>
                    <p>+</p>
                    <select onChange={(e) => selectThree(e)}>
                        <option></option>
                        {ing}
                    </select>
                    <br />
                </div>
                <h2>Effects</h2>
                <div className={styles.wrapper}>
                    <select>
                        {sharedIngredients.map((value, key) => {
                            return (
                                <option key={key}>{value}</option>
                            )
                        })}

                    </select>
                </div>
            </div>


        </div >


    )
}

export default Crafter;