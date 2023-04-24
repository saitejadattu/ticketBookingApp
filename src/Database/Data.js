import StartFirebase from '../Firebase/Firebase';
import { DataSnapshot, Ref, child, onValue,getDatabase, ref, get } from 'firebase/database';
const db=StartFirebase();

export  const getDataFromDB=(item)=>
{
    let records=[]
    const dbRef= ref(db,item);
onValue(dbRef,(snapshot)=>
{
    
    snapshot.forEach(child=>
        {
            let key=child.key;
            let val=child.val();
                    
            records.push({key:key,value:val});
        })
})  
return records;
    // const dbRef = ref(getDatabase());
    
    // let records={};
    // get(child(dbRef, item)).then((snapshot) => {
    // if (snapshot.exists()) {
    // console.log(snapshot.val());
    // records= snapshot.val();
    // // return snapshot.val();
    // // records = snapshot.val();
    // } else {
    //     console.log("No data available");
    //     return "No Data Available"
    // }
    // }).catch((error) => {
    // console.error(error);
    // return "Error"
    // });
    // // console.log(records,"DBs")
    // return records;
}
