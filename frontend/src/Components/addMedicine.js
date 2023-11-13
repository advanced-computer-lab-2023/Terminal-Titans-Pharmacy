function addMedicine() {

    const submitMedicine = async () => {
        const name = document.getElementsByName("Name")[0].value;
        const price = document.getElementsByName("Price")[0].value;
        const quantity = document.getElementsByName("Quantity")[0].value;
        const activeIngredients = document.getElementsByName("ActiveIngredients")[0].value;
        const medicalUse = document.getElementsByName("MedicalUse")[0].value;
        const overTheCounter = document.getElementsByName("overTheCounter")[0].value;
        const photo = document.getElementsByName("photo")[0].files[0];
        const formData = new FormData();
        formData.append("Name", name);
        formData.append("Price", price);
        formData.append("Quantity", quantity);
        formData.append("ActiveIngredients", activeIngredients);
        formData.append("MedicalUse", medicalUse);
        formData.append("OverTheCounter", overTheCounter);
        formData.append("photo", photo);
        await fetch("http://localhost:8000/Pharma/addMedicine", {
            method: "POST",
            body: formData
            , headers: {
                Authorization: 'Bearer ' + sessionStorage.getItem("token")
            }
        }).then(res => res.json()).then(data => {
            alert(data.Result)
            console.log(data.Result);
        }).catch((err) => {
            console.log(err);
            alert(err);
        }
        )
    }

    return (
        // <h1>Hello</h1>
        <><input type="text" name="Name" placeholder="Name" /><input type="number" name="Price" placeholder="Price" /><input type="number" name="Quantity" placeholder="Quantity" /><input type="text" name="ActiveIngredients" placeholder="Active Ingredients" /><input type="text" name="MedicalUse" placeholder="Medical Use" /><select name="overTheCounter" id="overTheCounter">
            <option value="true">Over The Counter</option>
            <option value="false">Not Over The Counter</option>
        </select><input type="file" name="photo" /><button type="submit" onClick={submitMedicine}>Add Medicine</button></>
    )
}


export default addMedicine;