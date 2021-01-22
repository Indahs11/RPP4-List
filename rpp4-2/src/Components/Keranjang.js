import React from 'react';
import $ from 'jquery';

class Keranjang extends React.Component{
    constructor(){
        super()
        this.state={
            produk: [
                {
                    nomer:1, nama:"Celana", harga:70000, jumlah:1, total:"70000", 
                    gambar: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT_hWp310iCacB5knUecJFgZ6m5i3CdPZSpVw&usqp=CAU"
                },{
                    nomer:2, nama:"Kemeja", harga:120000, jumlah:2, total:"240000", 
                    gambar: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR70Mb7_fenYW8hDXchDPh3k41BTLGotLJ67g&usqp=CAU"
                },{
                    nomer:3, nama:"Topi", harga:54000, jumlah:2, total:"108000", 
                    gambar: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSjnp5bYlIe8FIbfEni_EECTpo8z7_O-erHQQ&usqp=CAU"
                },{
                    nomer:4, nama:"Sepatu", harga:270000, jumlah:1, total:"270000", 
                    gambar: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQGbbIXuRgKtA3dPaKWVWy3aP7V90jp_d0kZQ&usqp=CAU"
                }
            ],
            action:"",
            nomer:0,
            nama:"",
            harga:0,
            jumlah:0,
            gambar:"",
            total: "",
            selectedItem: null,
            filterProduk: []
        }
        this.state.filterProduk = this.state.produk
    }
    Add = () => {
        $("#modal_produk").modal("show")
        this.setState({
            nomer:0,
            nama: "",
            harga:0,
            jumlah:0,
            gambar:"",
            total:"",
            action: "insert"
        })
    }
    Edit = (item) => {
        $("#modal_produk").modal("show")
        this.setState({
            nomer:item.nomer,
            nama: item.nama,
            harga:item.harga,
            jumlah:item.jumlah,
            gambar:item.gambar,
            total:item.total,
            action: "update",
            selectedItem: item
        })
    }
    Save = (event) => {
        event.preventDefault();
        let tempProduk = this.state.produk

        if (this.state.action === "insert") {
            tempProduk.push({
                nomer: this.state.nomer,
                nama: this.state.nama,
                harga: this.state.harga,
                jumlah: this.state.jumlah,
                gambar: this.state.gambar,
                total: this.state.total,
            })
        }else if(this.state.action === "update"){
            let index = tempProduk.indexOf(this.state.selectedItem)
            tempProduk[index].nomer = this.state.nomer
            tempProduk[index].nama = this.state.nama
            tempProduk[index].harga = this.state.harga
            tempProduk[index].jumlah = this.state.jumlah
            tempProduk[index].gambar = this.state.gambar
            tempProduk[index].total = this.state.total
        }
        this.setState({produk : tempProduk})
        $("#modal_produk").modal("hide")
    }
    Drop = (item) => {
        if(window.confirm("Apakah anda yakin menghapus data ini?")){
            let tempProduk = this.state.produk
            let index = tempProduk.indexOf(item)
            tempProduk.splice(index, 1)
            this.setState({produk: tempProduk})
        }
    }
    render(){
        return(
            <div className="container">
                <h1 className="text-center m-2">Keranjang BelanajaKu</h1>
                <div className="row">
                    <table className="table table-bordered m-4">
                        <thead className="table-warning text-center">
                            <tr>
                            <th scope="col">No</th>
                            <th scope="col">Gambar Produk</th>
                            <th scope="col">Nama Produk</th>
                            <th scope="col">Harga</th>
                            <th scope="col">Jumlah</th>
                            <th scope="col">Total Harga</th>
                            <th scope="col">Edit Delete</th>
                            </tr>
                        </thead>
                        {this.state.filterProduk.map((item, index) => (
                        <tbody className="text-center">
                            <tr>
                            <th scope="row">{item.nomer}</th>
                            <th><img src={item.gambar} className="img" height="200"/></th>
                            <th>{item.nama}</th>
                            <th>{item.harga}</th>
                            <th>{item.jumlah}</th>
                            <th>{item.total}</th>
                            <button className="btn btn-sm btn-success m-2" onClick={ () => this.Edit(item)}>Edit</button>
                            <button className="btn btn-sm btn-danger m-2" onClick={ () => this.Drop(item)}>Delete</button>
                            </tr>
                        </tbody>
                        ))}
                    </table>
                </div>
                <button className="btn btn-primary m-3" onClick={() => this.Add()}>
                    Tambah Data
                </button>
                <div className="modal" id="modal_produk">
                <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header bg-info text-white">Form List Keranjang Belanja</div>
                            <div className="modal-body">
                                <form onSubmit={ev => this.Save(ev)}>
                                    Nomer
                                    <input type="text" className="form-control mb-2" value={this.state.nomer}
                                    onChange={ ev => this.setState({nomer: ev.target.value})} required />
                                    Nama Produk
                                    <input type="text" className="form-control mb-2" value={this.state.nama}
                                    onChange={ ev => this.setState({nama: ev.target.value})} required />
                                    Harga
                                    <input type="text" className="form-control mb-2" value={this.state.harga}
                                    onChange={ ev => this.setState({harga: ev.target.value})} required />
                                    Jumlah
                                    <input type="text" className="form-control mb-2" value={this.state.jumlah}
                                    onChange={ ev => this.setState({jumlah: ev.target.value})} required />
                                    Gambar
                                    <input type="url" className="form-control mb-2" value={this.state.gambar}
                                    onChange={ ev => this.setState({gambar: ev.target.value})} required />
                                    <input className="form-control mb-2" value={this.state.total} readOnly/>
                                    <button className="btn btn-info btn-block " type="submit">Simpan</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
             </div>
        )
    }
}

export default Keranjang;