import React from 'react';
import $ from 'jquery';

class HariBesar extends React.Component{
    constructor(){
        super()
        this.state = {
            hari : [
                {
                    nomer: 1, tanggal: "10 Januari", peringatan:"Hari Sejuta Pohon"
                },{
                    nomer: 2, tanggal: "21 Februari", peringatan:"Hari Peduli Sampah Nasional"
                },{
                    nomer: 3, tanggal: "22 Maret", peringatan:"Hari Air Sedunia"
                },{
                    nomer: 4, tanggal: "22 April", peringatan:"Hari Bumi"
                },{
                    nomer: 5, tanggal: "22 Mei", peringatan:"Hari Keanekaragaman Hayati Internasiona"
                },{
                    nomer: 6, tanggal: "5 Juni", peringatan:"Hari Lingkungan Hidup Sedunia"
                },{
                    nomer: 7, tanggal: "26 Juli", peringatan:"Hari Mangrove Sedunia"
                },{
                    nomer: 8, tanggal: "10 Agustus", peringatan:"Hari Konserasi Alam Nasional"
                },{
                    nomer: 9, tanggal: "7 September", peringatan:"Hari Udara Bersih Internasional"
                },{
                    nomer: 10, tanggal: "16 September", peringatan:"Hari Pelestarian Lapisan Ozon Internasional"
                },{
                    nomer: 11, tanggal: "21 September", peringatan:"Hari Bersih-bersih Sedunia (World CleanUp Day)"
                },{
                    nomer: 12, tanggal: "5 November", peringatan:"Hari Cinta Puspa dan Satwa Nasional"
                },{
                    nomer: 13, tanggal: "28 November", peringatan:"Hari Menanam Pohon Nasional"
                },{
                    nomer: 14, tanggal: "4 Desember", peringatan:"Hari Konvservasi Kehidupan Liar sedubia"
                }
            ],

        action: "",
        nomer:0,
        tanggal: "",
        peringatan: "",
        selectedItem: null
        }
        this.state.filterHari = this.state.hari
    }
    Edit = (item) => {
        $("#modal_hari").modal("show")
        this.setState({
            nomer: item.nomer,
            tanggal: item.tanggal,
            peringatan: item.peringatan,
            action: "update",
            selectedItem: item
        })
    }
    Save = (event) => {
        event.preventDefault();
        let tempHari = this.state.hari

        if (this.state.action === "update"){
            let index = tempHari.indexOf(this.state.selectedItem)
            tempHari[index].nomer = this.state.nomer
            tempHari[index].tanggal = this.state.tanggal
            tempHari[index].peringatan = this.state.peringatan
        }
        this.setState({hari : tempHari})
        $("#modal_hari").modal("hide")
    }
    Drop = (item) => {
        if(window.confirm("Apakah anda yakin menghapus data ini ?")){
            let tempHari = this.state.hari
            let index = tempHari.indexOf(item)
            tempHari.splice(index, 1)
            this.setState({hari: tempHari})
        }
    }
    render() {
        return(
            <div className="container">
                <h2 className="text-center m-4">Peringatan Hari Besar Lingkungan Hidup</h2>
                <div className="row">
                    <table className="table table-striped m-1">
                        <thead>
                            <tr>
                            <th scope="col">No</th>
                            <th scope="col">Tanggal</th>
                            <th scope="col">Hari Peringatan</th>
                            <th scope="col">Edit dan Delete</th>
                            </tr>
                        </thead>
                    {this.state.filterHari.map( (item, index) => (
                        <tbody>
                        <tr>
                        <th scope="row">{item.nomer}</th>
                        <td>{item.tanggal}</td>
                        <td>{item.peringatan}</td>
                        <button className="btn btn-sm btn-success m-2" onClick={ () => this.Edit(item)}>Edit</button>
                        <button className="btn btn-sm btn-danger m-2" onClick={ () => this.Drop(item)}>Hapus</button>
                        </tr>
                    </tbody>
                    ) )}
                    </table>
                </div>
                <div className="modal" id="modal_hari">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">Form Hari Peringatan</div>
                            <div className="modal-body">
                                <form onSubmit={ev => this.Save(ev)}>
                                    Tanggal
                                    <input type="text" className="form-control mb-2" value={this.state.tanggal}
                                    onChange={ ev => this.setState({tanggal: ev.target.value})} required />
                                    Hari Peringatan
                                    <input type="text" className="form-control mb-2" value={this.state.peringatan}
                                    onChange={ ev => this.setState({peringatan: ev.target.value})} required />
                                    <button className="btn btn-info btn-block" type="submit">Simpan</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default HariBesar;