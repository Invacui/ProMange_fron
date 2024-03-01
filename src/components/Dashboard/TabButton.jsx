function TabButton({children,isActive,onClick}){
    if(isActive)
    {
        return(
            <div className="OptionsTab" id="SelectedTab" >
                {children}
            </div>
        );
    }
    return(
            <div className="OptionsTab" onClick={()=>{onClick();}}>
                {children}
            </div>
    );
}
export default TabButton;