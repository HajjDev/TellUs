import getQRCode from '../../requests/enable_MFA/getQRCode'

function RenderQRCode(){

    let filename = ""
    const getQRCodeHandler = async ()=>{
        filename = await getQRCode()
    }

    getQRCodeHandler()

    if (!filename){
        return null;
    }

    const path = `http://localhost:3001/api/mfa/data/${filename}`

    return (
        <>
            <img 
                src={path}
            />
        </>
    )
}

export default RenderQRCode