import { NextPage } from "next"
import Head from "next/head"
import Image from "next/image";
import styles from '../styles/Crafter.module.scss';
import { SetStateAction, useEffect, useState } from "react";
import Ingredients from "../public/data/alchemy.json";
import { useRouter } from "next/router";

const IngredientFinder: NextPage = () => {

    const router = useRouter();

    interface IIngredients {
        effects?: string[];
        image?: string;
        value?: number;
        name: string;
        weight?: number;
    }



    const [ingredients, setIngredients] = useState<(JSX.Element)[]>([]);
    const [resultEffects, setResultEffects] = useState<string[]>([]);

    const [arr1, setArr1] = useState<JSX.Element[]>([]);
    const [arr2, setArr2] = useState<JSX.Element[]>([]);
    const [arr3, setArr3] = useState<JSX.Element[]>([]);

    //const one: string[] = [];
    //const two: string[] = [];
    //const three: string[] = [];

    const [one, setOne] = useState<IIngredients>();
    const [two, setTwo] = useState<IIngredients>();
    const [three, setThree] = useState<IIngredients>();


    useEffect(() => {
        setIngredients(Ingredients.ingredients.map((item, key) => <option key={key} value={item.name}>{item.name}</option>));
        setArr1(ingredients);
        setArr2(ingredients);
        setArr3(ingredients);
    }, []);

    useEffect(() => {
        setResultEffects([]);
        setArr1([]);
        setArr2([]);
        setArr3([]);
        //const allEffects: string[] = [];
        const allNames: string[] = [];

        //Nullish coalescing
        const allEffects : string[] = [...(one?.effects??[]),...(two?.effects??[]),...(three?.effects??[])];
        //one?.effects!.forEach(e => allEffects.push(e));
        //two?.effects!.forEach(e => allEffects.push(e));
        //three?.effects!.forEach(e => allEffects.push(e));

        Ingredients.ingredients.map((item, key) => {

            //Conditional array
            if (item.name !== two?.name && item.name !== three?.name) setArr1(previousArr => [...previousArr, <option key={key} value={item.name}>{item.name}</option>]);
            if (item.name !== one?.name && item.name !== three?.name) setArr2(previousArr => [...previousArr, <option key={key} value={item.name}>{item.name}</option>]);
            if (item.name !== one?.name && item.name !== two?.name) setArr3(previousArr => [...previousArr, <option key={key} value={item.name}>{item.name}</option>]);
        });

        //console.log(avalibeIngredients);
        console.log(ingredients);



        Ingredients.effects.forEach((e) => {
            const num = allEffects.reduce((value, currentItem) => {
                return (currentItem === e) ? value + 1 : value;
            }, 0)
            if (num >= 2) {
                setResultEffects(oldArr => [...oldArr, e]);
            }
        });

    }, [one, two, three])



    function log() {
        console.log(ingredients);
        console.log(one);
    }

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

export default IngredientFinder;