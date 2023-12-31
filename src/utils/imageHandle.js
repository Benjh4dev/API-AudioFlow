import { validateBufferMIMEType } from "validate-image-type"

const verifyType = async (file) => {
    const valid = await validateBufferMIMEType(file.buffer, {
        allowMimeTypes: ['image/jpeg', 'image/png', 'image/jpg'],
    })
    return valid
}


export { verifyType }
