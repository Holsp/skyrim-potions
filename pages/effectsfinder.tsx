import { NextPage } from "next"
import Head from "next/head"
import Image from "next/image";
import styles from '../styles/Crafter.module.scss';
import { SetStateAction, useEffect, useState } from "react";
import Ingredients from "../public/data/alchemy.json";
import { useRouter } from "next/router";

const EffectsFinder: NextPage = () => {
    const router = useRouter();

    interface IIngredients {
        effects?: string[];
        image?: string;
        value?: number;
        name: string;
        weight?: number;
    }


    //Variable in which effects from all three inputs are stored
    const [resultEffects, setResultEffects] = useState<string[]>([]);

    //Individual JSX arrays that are displayed as <option> in code
    const [arr1, setArr1] = useState<JSX.Element[]>([]);
    const [arr2, setArr2] = useState<JSX.Element[]>([]);
    const [arr3, setArr3] = useState<JSX.Element[]>([]);

    //Variables in which the current selected IInterface is stored
    const [one, setOne] = useState<IIngredients>();
    const [two, setTwo] = useState<IIngredients>();
    const [three, setThree] = useState<IIngredients>();

    //Fills individual JSX arrays with data
    useEffect(() => {
        setArr1(Ingredients.ingredients.map((item, key) => <option key={key} value={item.name}>{item.name}</option>));
        setArr2(arr1);
        setArr3(arr1);
    }, []);

    useEffect(() => {
        //Empties out arrays
        setResultEffects([]);
        setArr1([]);
        setArr2([]);
        setArr3([]);
        const allNames: string[] = [];

        //Hides already selected options for other <select> JSX elements
        Ingredients.ingredients.map((item, key) => {

            //Conditional array
            if (item.name !== two?.name && item.name !== three?.name) setArr1(previousArr => [...previousArr, <option key={key} value={item.name}>{item.name}</option>]);
            if (item.name !== one?.name && item.name !== three?.name) setArr2(previousArr => [...previousArr, <option key={key} value={item.name}>{item.name}</option>]);
            if (item.name !== one?.name && item.name !== two?.name) setArr3(previousArr => [...previousArr, <option key={key} value={item.name}>{item.name}</option>]);
        });


        //Nullish coalescing
        //allEffects are filled thanks to NC. allEffects are used to find out if any potion effects are created
        const allEffects: string[] = [...(one?.effects ?? []), ...(two?.effects ?? []), ...(three?.effects ?? [])];

        //Iterates through all effects in Ingredients.json. If the effect appears twice in allEffects.reduce
        //It will be saved into setResultEffects and mapped
        Ingredients.effects.forEach((e) => {
            const num = allEffects.reduce((value, currentItem) => {
                return (currentItem === e) ? value + 1 : value;
            }, 0)
            if (num >= 2) {
                setResultEffects(oldArr => [...oldArr, e]);
            }
        });

    }, [one, two, three])


    return (
        <div>
            <Head>
                <title>Skyrim alchemy</title>
            </Head>
            <div className={styles.imageWrapper} onClick={() => router.push("/")}>
                <Image src="/images/logo.png" width={30} height={50}></Image>
            </div>
            <div className={styles.wrappers}>

                <h2>Ingredients</h2>
                <div className={styles.wrapper}>
                    <select onChange={(e) => setOne(Ingredients.ingredients.find((item) => item.name === e.target.value))}>
                        <option></option>
                        {arr1}
                    </select>
                    <p>+</p>
                    <select onChange={(e) => setTwo(Ingredients.ingredients.find((item) => item.name === e.target.value))}>
                        <option></option>
                        {arr2}
                    </select>
                    <p>+</p>
                    <select onChange={(e) => setThree(Ingredients.ingredients.find((item) => item.name === e.target.value))}>
                        <option></option>
                        {arr3}
                    </select>
                    <br />
                </div>
                <h2>Effects</h2>
                <div className={styles.wrapper}>
                    <select>
                        {resultEffects.map((item, key) => <option key={key}>{item}</option>)}
                    </select>
                </div>
            </div>
        </div >


    )
}

export default EffectsFinder;