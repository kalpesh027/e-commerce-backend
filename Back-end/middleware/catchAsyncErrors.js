module.exports = theFunc =>(req, res , next)=>{
    Promise.resolve(thefuct(req, res, next)).catch(next);
}