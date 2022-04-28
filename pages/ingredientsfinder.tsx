import { NextPage } from "next"
import Head from "next/head";
import Ingredients from "../public/data/alchemy.json";
import styles from "../styles/Crafter.module.scss"
import Image from "next/image";
import { useRouter } from "next/router";
import { useState } from "react";

const IngredientsFinder: NextPage = () => {
    const router = useRouter();

    interface IIngredients {
        effects?: string[];
        image?: string;
        value?: number;
        name: string;
        weight?: number;
    }

    const [possibleIngredients, setPossibleIngredients] = useState<IIngredients[]>([]);

    function changeIngredients(value : string) {
        console.log(value);
        setPossibleIngredients([]);
        console.log(possibleIngredients);
        Ingredients.ingredients.filter(item => item.effects.map(itemForeach => {
            if (itemForeach === value) {
                setPossibleIngredients(oldArr => [...oldArr, item]);
            }
        } ));
    }


    return (
        <div>
            <Head>
                <title>Ingredients finder</title>
            </Head>
            <div className={styles.imageWrapper} onClick={() => router.push("/")}>
                <Image src="/images/logo.png" width={30} height={50}></Image>
            </div>
            <div>
                <div className={styles.wrappers}>
                    <h2>Select effect</h2>
                    <div className={styles.wrapper}>
                        <select onChange={(e) => changeIngredients(e.target.value)}>
                        <option></option>
                        {Ingredients.effects.map((item, key) => <option key={key} value={item}>{item}</option>)}
                        </select>
                    </div>
                    <h2>Possible ingredients</h2>
                    <div className={styles.wrapper}>
                        <select>
                            {possibleIngredients.map((item, key) => <option key={key}>{item.name}</option>)}
                        </select>
                    </div>
                </div>

            </div>
        </div>
    );
}

export default IngredientsFinder;