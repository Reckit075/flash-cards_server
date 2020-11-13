import User from '../models/User.mjs'


export const dataBase_post_deleteAll = async (req, res) => {
    try {
        User.deleteMany({isAdmin:false}, function (err) {
            if(err) console.log(err);
            console.log("Successful deletion");
            }
        )
            res.json({ succes: true, message: 'usunieto dane' })
    }
    catch (error) {
        res.statusCode = 500
        res.json({ error: error.toString() })
    }
}