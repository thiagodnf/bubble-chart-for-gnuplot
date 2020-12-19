import Card from "react-bootstrap/Card";

import Navbar from "../partials/Navbar";
import Head from "../partials/Head";
import Footer from "../partials/Footer";
import ModalResult from "../partials/ModalResult";
import template from "../data/template.js";

function Index(props) {

    return (
        <div>
            <Head />
            <Navbar />
            <div className="container-fluid">
                <form id="form-generate" action="#">
                    <div className="row">
                        <div className="col-lg-8 mb-3">
                            <Card className="shadow">
                                <Card.Header>Data</Card.Header>
                                <Card.Body className="pb-0">
                                    <div className="form-group">
                                        <textarea autoFocus autoComplete="off" className="form-control" rows="20" id="data" name="data" required placeholder="Put the values separate by ';'. Click in the above Example button to see how to put the input in this tool."></textarea>
                                    </div>
                                </Card.Body>
                            </Card>
                        </div>
                        <div className="col-lg-4">
                            <Card className="shadow">
                                <Card.Header>Settings</Card.Header>
                                <Card.Body>
                                    <div className="row" >
                                        <div className="col-6">
                                            <div className="form-group">
                                                <label htmlFor="circle-color">Circle Color</label>
                                                <select className="form-control selectPicker" id="circle-color" defaultValue={'#7cb5ec'}>
                                                    <option style={{background: '#7cb5ec'}} value="#7cb5ec">Blue</option>
                                                    <option style={{background: '#434348'}} value="#434348">Black</option>
                                                    <option style={{background: '#90ed7d'}} value="#90ed7d">Green</option>
                                                    <option style={{background: '#f7a35c'}} value="#f7a35c">Orange</option>
                                                    <option style={{background: '#8085e9'}} value="#8085e9">Purple</option>
                                                    <option style={{background: '#f15c80'}} value="#f15c80">Pink</option>
                                                    <option style={{background: '#e4d354'}} value="#e4d354">Yellow</option>
                                                    <option style={{background: '#2b908f'}} value="#2b908f">Cornflower Blue</option>
                                                    <option style={{background: '#f45b5b'}} value="#f45b5b">Red</option>
                                                    <option style={{background: '#91e8e1'}} value="#91e8e1">Aquamarine</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div className="col-6">
                                            <div className="form-group">
                                                <label htmlFor="text-color">Text Color</label>
                                                <select className="form-control selectPicker" id="text-color" defaultValue={'black'}>
                                                    <option value="black">Black</option>
                                                    <option value="white">White</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-6">
                                            <div className="form-group">
                                                <label htmlFor="wrap-text">Wrap Text</label>
                                                <select className="form-control selectPicker" id="wrap-text" defaultValue={'Yes'}>
                                                    <option value="Yes">Yes</option>
                                                    <option value="No">No</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div className="col-6">
                                            <div className="form-group">
                                                <label htmlFor="output">Output</label>
                                                <select className="form-control selectPicker" id="output" defaultValue={'pdf'}>
                                                    <option value="pdf">PDF</option>
                                                    <option value="png">PNG</option>
                                                    <option value="jpg">JPG</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-6">
                                            <div className="form-group">
                                                <label htmlFor="widescreen">Widescreen</label>
                                                <select className="form-control selectPicker" id="widescreen" defaultValue={'1'}>
                                                    <option value="1">Yes</option>
                                                    <option value="0">No</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div className="col-6">
                                            <div className="form-group">
                                                <label htmlFor="scale">Scale</label>
                                                <select className="form-control selectPicker" id="scale" defaultValue={'1'}>
                                                    <option value="1">1</option>
                                                    <option value="2">2</option>
                                                    <option value="3">3</option>
                                                    <option value="4">4</option>
                                                    <option value="5">5</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                    <hr className="mt-0"/>
                                    <button className="btn btn-primary" id="btn-generate">Generate</button>
                                </Card.Body>
                            </Card>
                        </div>
                    </div>
                </form>
            </div>

            <textarea className="d-none" id="model" defaultValue={props.template}></textarea>

            <ModalResult/>

            <Footer/>
        </div>
    );
}

export function getStaticProps() {

    return {
        props: {
            template: template.trim()
        }
    };
}

export default Index;
