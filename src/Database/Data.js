import StartFirebase from '../Firebase/Firebase';
import {  onValue, ref } from 'firebase/database';
const db = StartFirebase();

export const getDataFromDB = (item) => {
    let records = []
    const dbRef = ref(db, item);
    onValue(dbRef, (snapshot) => {

        snapshot.forEach(child => {
            let key = child.key;
            let val = child.val();

            records.push({ key: key, value: val });
        })
    })
    return records;
}
