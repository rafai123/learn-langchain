export default function handler(req, res) {
    // we want to read key: "Something here", lastName

    console.log("I'm in the api route")
    const {lastName, key} = req.body

    console.log(lastName)
    console.log(key)
    res.status(200).json({result: `Your last name ${lastName} is awesome`})
}