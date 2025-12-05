function Component() {

    return (
        <div className="modal" id="modal-result" tabIndex="-1" role="dialog">
           <div className="modal-dialog" role="document">
               <div className="modal-content">
                   <div className="modal-header">
                       <h4 className="modal-title">Script</h4>
                   </div>
                   <div className="modal-body">
                        <form>
                            <div className="form-group">
                                <textarea className="form-control" rows="10" id="script"></textarea>
                            </div>
                        </form>
                   </div>
                   <div className="modal-footer">
                       <a href="#" className="btn btn-outline-secondary" download="script.gnu" id="export">Export do File</a>
                       <button type="button" className="btn btn-outline-secondary" id="btn-copy" data-clipboard-target="#script">Copy to clipboard</button>
                       <button type="button" className="btn btn-primary" data-dismiss="modal">Close</button>
                   </div>
               </div>
           </div>
       </div>
    );
}

export default Component;
