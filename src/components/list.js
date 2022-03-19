
import {FaTrash} from 'react-icons/fa'
import Loading from './Loading'

const List = (props) => {

  const filteredData = props.data?.filter((item) => item.type === props.type);

  const formatToRupiah = (number) => {
    return new Intl.NumberFormat("id-ID", {style: "currency",  currency: "IDR" }).format(number);
  };

  return (
    <div className= {`bg-${props.bg} col-4  px-2 py-2`} style={{borderRadius: '5px'}}>
      <h1 className="text-center mt-2">{props.type === "income" ? "Pemasukan" : "Pengeluaran"}</h1>

      {props.loading ? (
        <Loading />
      ) : ( 
        <>
          <h3 className="text-center"> {formatToRupiah(filteredData?.reduce( (acc, curr) =>  acc + curr.nominal, 0) )} </h3>
          <ul className="list-group mt-3">
              {filteredData?.map(item => (
                <li className="d-flex justify-content-between list-group-item" key={item.id}>
                  <span>{item.name}</span>
                  <div>
                    <span>{formatToRupiah(item.nominal)}</span>
                    <FaTrash 
                      className="text-danger" 
                      size={16}
                      style={{
                        marginLeft: "15px", cursor:"pointer"
                      }}
                      onClick={() => props.removeData(item.id)}
                    />
                  </div>
                </li>
              ))}
          </ul>
        </>
      )}  
    </div>
  )
}

export default List