const handleError = (res, error) => {
    res.status(500)
    res.send({error})
}

export { handleError }