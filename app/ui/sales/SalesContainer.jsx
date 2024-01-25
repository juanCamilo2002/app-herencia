"use client"
import Datatable from '../datatable/Datatable';
import { useEffect, useState } from "react";
import { getSales } from "@/lib/utils/api";
import { useSession } from "next-auth/react";

const SalesContainer = () => {
    const [salesData, setSalesData] = useState([]);
    const { data: session } = useSession();
    const [loading, setLoading] = useState(true);

    const getData = async () => {
        try {
            const res = await getSales(session.user.data.accessToken);
            setSalesData(res.data.map((d) => ({
                id: d._id,
                date: d.createdAt,
                company: d.customerDetails.company,
                product: d.productDetails.name,
                unitAmount: d.unitAmount,
                unitPrice: d.unitPrice,
                totalPrice: d.totalPrice,
                pay: d.pay,
                actions: true
            })));
            setLoading(false);
        } catch (error) {
            console.error('error fetching data:', error);
        }
    }

    useEffect(() => {
        getData();
    }, []);


    const columns = [
        "Fecha",
        "Cliente",
        "Producto",
        "Cantidad",
        "Precio unidad",
        "Total",
        "Estado",
        "Acciones"
    ];
    
    return (
        <Datatable
            columns={columns}
            data={salesData}
            defaultPageSizeOptions={[5, 10, 20, 30]}
            title="ventas"
            urlApi="sales"
            getData={getData}
            loading={loading}
        />
    )
}

export default SalesContainer;