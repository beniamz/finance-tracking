
import {useState} from 'react'
import Loading from './Loading'

const Form = ({addData, postLoading}) => {

  const [type, setType] = useState("")
  const [form, setForm] = useState ({
    name: "",
    description: "",
    nominal: 0,
  });

  const {name, description, nominal} = form;

  const onChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const clearForm = () => {
    setType("");
    setForm({
      name: "",
      description: "",
      nominal: 0,
    })
  }
 
  // agar tidak refesh halaman 
  const onSubmit = (e) => {
    e.preventDefault(); 

    addData({
      name,
      description,
      type,
      nominal: +nominal,
      createdAt: new Date().toISOString()
    })

    clearForm();

  }

  const typeString = type === "Expense" ? "Pengeluaran" : type === "Income" ? "Pemasukan" : "";

  return (
    <div className="col-4">
      <h4 className="text-center font-bold text-warning">Form Input Data Keuangan</h4>
      <form className="px-2 py-2" onSubmit={onSubmit}>  
        <div className="form-group mb-3">
          <label className="mb-2">Pilih Type </label>
          <select className="form-control" value={type} onChange={(e) => setType(e.target.value)}>
            <option value="">Pilih Type</option>
            <option value="income">Pemasukan</option>
            <option value="expense">Pengeluaran</option>            
          </select>
        </div>

        <div className="form-group mb-3">
          <label for="exampleFormControlInput1" class="form-label">
            Input Nama {" "} {typeString}
          </label>
          <input name="name" value={name} onChange={onChange} type="text" className="form-control" id="exampleFormControlInput1" placeholder={`Nama ${typeString}`} disabled={!type} />
        </div>

        <div className="form-group mb-3">
          <label for="exampleFormControlInput1" class="form-label">Deskripsi
             {" "} {typeString}
          </label>
          <textarea name="description" value={description} onChange={onChange} className="form-control" placeholder={`Uraikan ${typeString}`} disabled={!type}></textarea>
        </div>
        
        <div className="form-group mb-3">
          <label for="exampleFormControlInput1" class="form-label">Nominal {typeString}</label>
          <input name="nominal" value={nominal} onChange={onChange} type="number" className="form-control" id="exampleFormControlInput1" placeholder={`Isikan Nominal ${typeString}`}  disabled={!type} />
        </div>

        <div className=" d-grid gap-1 form-group mb-1">
          <button className="btn btn-primary " disabled={!type || postLoading}>
            Simpan {postLoading && <Loading />}
          </button>
        </div>

        {/* <pre>{JSON.stringify(form, null, 2)}</pre> */}

      </form>
    </div>
  )
}



export default Form;