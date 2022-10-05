const { Pool, types } = require("pg")
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'postgres',
    password: 'Aposum234',
    port: 5432,
  })
const dotenv = require("dotenv")
dotenv.config()

const getInformation = (request, response) => {
    const { sortingDirection, sortingColumn, filterColumn, typeOfComparison,  comparisonValue } = request.body;
    let query;
    if (filterColumn === ''){
        if (sortingDirection === 'up'){
            query = 'SELECT * FROM public."Information" ORDER BY ' + sortingColumn + ' ASC';
        }
        else if (sortingDirection === 'down'){
            query = 'SELECT * FROM public."Information" ORDER BY ' + sortingColumn + ' DESC';  
        }
    }
    else if (filterColumn !== ''){
        if (sortingDirection === 'up'){
            if (typeof(comparisonValue) === 'string'){
                query = 'SELECT * FROM public."Information" WHERE ' + filterColumn + ' ' + typeOfComparison + " '" + comparisonValue + "' ORDER BY " + sortingColumn + ' ASC';
            }
            else if (typeof(comparisonValue) === 'number'){
                query = 'SELECT * FROM public."Information" WHERE ' + filterColumn + ' ' + typeOfComparison + ' ' + comparisonValue + ' ORDER BY ' + sortingColumn + ' ASC';
            }
        }
        else if (sortingDirection === 'down'){
            if (typeof(comparisonValue) === 'string'){
                query = 'SELECT * FROM public."Information" WHERE ' + filterColumn + ' ' + typeOfComparison + " '" + comparisonValue + "' ORDER BY " + sortingColumn + ' DESC';
            }
            else if (typeof(comparisonValue) === 'number'){
                query = 'SELECT * FROM public."Information" WHERE ' + filterColumn + ' ' + typeOfComparison + ' ' + comparisonValue + ' ORDER BY ' + sortingColumn + ' DESC';
            }
        }
    }
    console.log(query);
    try{
        pool.query(query, (error, results) => {
        let data = new Array;
        let page = new Array;
        page.push(1);
        let rowCount = 6;
        for (let i = 0; i < results.rows.length; i++){
            if ( i % rowCount === 0 && i !== 0){
                data.push(page);
                page = new Array;
                page.push(data.length + 1);
            }
            let date = new Date(results.rows[i].date_field);
            results.rows[i].date_field =  date.getFullYear() + '-' + String(Number(date.getMonth()) + 1) + '-' + date.getDate(); 
            page.push(results.rows[i]);
        }
        if (data.indexOf(page) === -1){
            data.push(page);
        }
        response.status(200).json(data);
        });
    }
    catch(error){
        console.log(error);
    }
};

module.exports = {
    getInformation,
};