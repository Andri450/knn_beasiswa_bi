const AppError = require("../utils/appError");
const fs = require("fs");
const { parse } = require("csv-parse");

exports.downloadFile = (req, res, next) => {
    if (!req.params.id) {
        return next(new AppError("No P3KE id found", 404));
    }

    const folderPath = __dirname+'/../file_permintaan_data/';

    const fileName = req.params.id == 'bast' ? 'bast.xlsx' : 'format.xlsx'; 

    res.download(folderPath + fileName, fileName, (err) => {
        if (err) {
            console.log(err)
            // res.status(500).send({
            //     message: "Could not download the file. " + err,
            // });
        }
    });
};

exports.ambilData = (req, res, next) => {

    const dat = []
    let i = 0

    fs.createReadStream("./data/BeasiswaBI.csv")
        .pipe(parse())
        .on("data", function (row) {
            
            if(i > 1 && row[7] != '' && row[8] != '' && row[9] != '' && row[10] != '' && row[11] != ''){
                let dt = {
                    Status_Beasiswa: row[0],
                    nr20181: row[7],
                    nr20182: row[8],
                    nr20191: row[9],
                    nr20192: row[10],
                    nr20201: row[11],
                    ip: row[12],
                    penghasilan_ortu: row[13],
                    tanggungan_ortu: row[14],
                    usia: row[16],
                }
                dat.push(dt);
            }

            i++;

        })
        .on("end", () => {


            res.status(200).json({
                dat,
            });

        })

}

exports.testModel = (req, res, next) => {

    const dat = []
    let i = 0

    fs.createReadStream("./data/BeasiswaBI.csv")
        .pipe(parse())
        .on("data", function (row) {
            
            if(i > 1 && row[7] != '' && row[8] != '' && row[9] != '' && row[10] != '' && row[11] != ''){
                let dt = {
                    Status_Beasiswa: row[0],
                    nr20181: row[7],
                    nr20182: row[8],
                    nr20191: row[9],
                    nr20192: row[10],
                    nr20201: row[11],
                    ip: row[12],
                    penghasilan_ortu: row[13],
                    tanggungan_ortu: row[14],
                    usia: row[16],
                }
                dat.push(dt);
            }

            i++;

        })
        .on("end", () => {

            let rataakurasi = 0;
            let jumlahPercobaan = 10;
            let k = 3;
            let dats = [];

            const getRandomInt = (max) => {
                return Math.floor(Math.random() * max);
            }

            const jarakeuc = (q1, w1, e1, r1, t1, y1, u1, i1, o1, q2, w2, e2, r2, t2, y2, u2, i2, o2) => { 
                return Math.sqrt(Math.pow(q2 - q1, 2) + Math.pow(w2 - w1, 2) + Math.pow(e2 - e1, 2) + Math.pow(r2 - r1, 2) + Math.pow(t2 - t1, 2) + Math.pow(y2 - y1, 2) + Math.pow(u2 - u1, 2) + Math.pow(i2 - i1, 2) + Math.pow(o2 - o1, 2) * 1.0); 
            }

            for (let x = 0; x < dat.length; x++) {
                    
                let dt = {
                    Status_Beasiswa: dat[x]['Status_Beasiswa'],
                    nr20181: dat[x]['nr20181'],
                    nr20182: dat[x]['nr20182'],
                    nr20191: dat[x]['nr20191'],
                    nr20192: dat[x]['nr20192'],
                    nr20201: dat[x]['nr20201'],
                    ip: dat[x]['ip'],
                    penghasilan_ortu: dat[x]['penghasilan_ortu'],
                    tanggungan_ortu: dat[x]['tanggungan_ortu'],
                    usia: dat[x]['usia'],
                    jarak: jarakeuc(req.body.nr20181, req.body.nr20182, req.body.nr20191, req.body.nr20192, req.body.nr20201, req.body.ip, req.body.penghasilan_ortu, req.body.tanggungan_ortu, req.body.usia, dat[x]['nr20181'], dat[x]['nr20182'], dat[x]['nr20191'], dat[x]['nr20192'], dat[x]['nr20201'], dat[x]['ip'], dat[x]['penghasilan_ortu'], dat[x]['tanggungan_ortu'], dat[x]['usia'],)
                }
                
                dats.push(dt)

            }

            dats.sort(function(a, b){return a.jarak-b.jarak})

            let ya = 0;
            let no = 0;

            for (let n = 0; n < k; n++) {
                if(dats[n]['Status_Beasiswa'] == 'Iya'){
                    ya += 1;
                }else{
                    no += 1;
                }
            }

            let hasil = '';
            if (ya > no) {
                hasil = 'Iya';
            }else{
                hasil = 'Tidak';
            }

            res.status(200).json({
                prediksi: hasil,
                ya,
                no
            });
 
        })

}

exports.trainData = (req, res, next) => {

    const dat = []
    let i = 0

    fs.createReadStream("./data/BeasiswaBI.csv")
        .pipe(parse())
        .on("data", function (row) {
            
            if(i > 1 && row[7] != '' && row[8] != '' && row[9] != '' && row[10] != '' && row[11] != ''){
                let dt = {
                    Status_Beasiswa: row[0],
                    nr20181: row[7],
                    nr20182: row[8],
                    nr20191: row[9],
                    nr20192: row[10],
                    nr20201: row[11],
                    ip: row[12],
                    penghasilan_ortu: row[13],
                    tanggungan_ortu: row[14],
                    usia: row[16],
                }
                dat.push(dt);
            }

            i++;

        })
        .on("end", () => {

            let rataakurasi = 0;
            let jumlahPercobaan = 10;
            let k = 3;
            let dats = [];

            const getRandomInt = (max) => {
                return Math.floor(Math.random() * max);
            }

            const jarakeuc = (q1, w1, e1, r1, t1, y1, u1, i1, o1, q2, w2, e2, r2, t2, y2, u2, i2, o2) => { 
                return Math.sqrt(Math.pow(q2 - q1, 2) + Math.pow(w2 - w1, 2) + Math.pow(e2 - e1, 2) + Math.pow(r2 - r1, 2) + Math.pow(t2 - t1, 2) + Math.pow(y2 - y1, 2) + Math.pow(u2 - u1, 2) + Math.pow(i2 - i1, 2) + Math.pow(o2 - o1, 2) * 1.0); 
            }

            for (let i = 0; i < jumlahPercobaan; i++) {
                
                let ranData = getRandomInt(dat.length - 1);

                for (let x = 0; x < dat.length; x++) {
                    
                    let dt = {
                        Status_Beasiswa: dat[x]['Status_Beasiswa'],
                        nr20181: dat[x]['nr20181'],
                        nr20182: dat[x]['nr20182'],
                        nr20191: dat[x]['nr20191'],
                        nr20192: dat[x]['nr20192'],
                        nr20201: dat[x]['nr20201'],
                        ip: dat[x]['ip'],
                        penghasilan_ortu: dat[x]['penghasilan_ortu'],
                        tanggungan_ortu: dat[x]['tanggungan_ortu'],
                        usia: dat[x]['usia'],
                        jarak: jarakeuc(dat[ranData]['nr20181'], dat[ranData]['nr20182'], dat[ranData]['nr20191'], dat[ranData]['nr20192'], dat[ranData]['nr20201'], dat[ranData]['ip'], dat[ranData]['penghasilan_ortu'], dat[ranData]['tanggungan_ortu'], dat[ranData]['usia'], dat[x]['nr20181'], dat[x]['nr20182'], dat[x]['nr20191'], dat[x]['nr20192'], dat[x]['nr20201'], dat[x]['ip'], dat[x]['penghasilan_ortu'], dat[x]['tanggungan_ortu'], dat[x]['usia'],)
                    }
                    
                    dats.push(dt)

                }

                dats.sort(function(a, b){return a.jarak-b.jarak})

                let ya = 0;
                let no = 0;

                for (let n = 0; n < k; n++) {
                    if(dats[n]['Status_Beasiswa'] == 'Iya'){
                        ya += 1;
                    }else{
                        no += 1;
                    }
                }

                let hasil = '';
                if (ya > no) {
                    hasil = 'Iya';
                }else{
                    hasil = 'Tidak';
                }

                if (hasil == dats[ranData]['Status_Beasiswa']) {
                    rataakurasi += 1;
                }
                
            }

            rataakurasi = (rataakurasi / jumlahPercobaan) * 100;

            res.status(200).json({
                rataakurasi,
            });
 
        })

}

exports.getcsv = (req, res, next) => {

    const dat = []
    let i = 0

    fs.createReadStream("./data_training/play_tennis_train.csv")
        .pipe(parse())
        .on("data", function (row) {
            
            dat.push(row[0].split(';'));
            i++

        })
        .on("end", () => {
            dat.shift();

            // kondisi terburuk
            // let outlook = 'Rain'
            // let temp = 'Cool'
            // let humidity = 'High'
            // let wind = 'Strong'

            // kondisi terbaik
            let outlook = 'Rain'
            let temp = 'Cool'
            let humidity = 'High'
            let wind = 'Strong'
            
            let outlook_val = (outlook == 'Sunny' ? 0 : (outlook == 'Overcast' ? 1 : 2))
            let temp_val = ( temp == 'Mild' ? 0 : (temp == 'Hot' ? 1 : 2))
            let humidity_val = (humidity == 'Normal' ? 0 : 1)
            let wind_val = (wind == 'Weak' ? 0 : 1)

            let inp_x = outlook_val + temp_val
            let inp_y = humidity_val + wind_val

            const jarakeuc = (x1, y1, z1, a1, x2,  y2, z2, a2) => { 
                return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2) + Math.pow(z2 - z1, 2) + Math.pow(a2 - a1, 2) * 1.0); 
            }

            const diff_num = (n, s) => {
                if (n <= s) {
                  return (s - n);
                }else{
                   return (n - s);
                }
            }

            let dats = []
            let dats_yes = []
            let dats_no = []
            dat.map((d) => {

                let ot = d[1] == 'Sunny' ? 0 : (d[1] == 'Overcast' ? 1 : 2)
                let te = d[2] == 'Mild' ? 0 : (d[1] == 'Hot' ? 1 : 2)
                let hu = d[3] == 'Normal' ? 0 : 1
                let wi = d[4] == 'Weak' ? 0 : 1

                let ds = {
                    'day': d[0],
                    'outlook': ot,
                    'temp': te,
                    'humidity': hu,
                    'wind': wi,
                    'jarak': jarakeuc(ot, te, hu, wi, outlook_val, temp_val, humidity_val, wind_val),
                    'play': d[5]
                }

                dats.push(ds)

                if(d[5] == 'Yes'){
                    dats_yes.push(ds)
                }else{
                    dats_no.push(ds)
                }
            })

            let jumlah_target = 6

            randomin = (min, max) => {
                return Math.floor(Math.random() * (max - min) + min);
            }

            randominf = (min, max) => {
                return Math.random() * (max - min) + min;
            }
            
            let jumlah_yes = dats_yes.length
            let target_yes = (jumlah_target - jumlah_yes)
            
            for (let i = 0; i < target_yes; i++) {
                
                let lolos = false
                x_ran = randomin(0, jumlah_yes)
                x_ran2 = randomin(0, jumlah_yes)

                let ds = {
                    'day': `D${i}`,
                    'outlook': (diff_num(dats_yes[x_ran].outlook, dats_yes[x_ran2].outlook)) * randominf(0, 1),
                    'temp': (diff_num(dats_yes[x_ran].temp, dats_yes[x_ran2].temp)) * randominf(0, 1),
                    'humidity': (diff_num(dats_yes[x_ran].humidity, dats_yes[x_ran2].humidity)) * randominf(0, 1),
                    'wind': (diff_num(dats_yes[x_ran].wind, dats_yes[x_ran2].wind)) * randominf(0, 1),
                    'jarak': dats_yes[x_ran].jarak,
                    'play': 'Yes' 
                } 

                for (let x = 0; x < dats_yes.length; x++) {     
                    if (dats_yes[x].outlook != ds.outlook && dats_yes[x].temp != ds.temp && dats_yes[x].humidity != ds.humidity && dats_yes[x].wind != ds.wind) {
                        lolos = true
                    }else{
                        lolos = false
                        break
                    }
                }

                if(lolos){
                    dats_yes.push(ds)
                }else{
                    i -= 1
                }
                
            }
            
            let jumlah_no = dats_no.length
            let target_no = (jumlah_target - jumlah_no)
            
            for (let i = 0; i < target_no; i++) {
                
                x_ran = randomin(0, jumlah_no)
                x_ran2 = randomin(0, jumlah_no)

                let ds = {
                    'day': `D${i}`,
                    'outlook': (diff_num(dats_no[x_ran].outlook, dats_no[x_ran2].outlook)) * randominf(0, 1),
                    'temp': (diff_num(dats_no[x_ran].temp, dats_no[x_ran2].temp)) * randominf(0, 1),
                    'humidity': (diff_num(dats_no[x_ran].humidity, dats_no[x_ran2].humidity)) * randominf(0, 1),
                    'wind': (diff_num(dats_no[x_ran].wind, dats_no[x_ran2].wind)) * randominf(0, 1),
                    'jarak': dats_no[x_ran].jarak,
                    'play': 'No' 
                } 

                for (let x = 0; x < dats_no.length; x++) {     
                    if (dats_no[x].outlook != ds.outlook && dats_no[x].temp != ds.temp && dats_no[x].humidity != ds.humidity && dats_no[x].wind != ds.wind) {
                        lolos = true
                    }else{
                        lolos = false
                        break
                    }
                }

                if(lolos){
                    dats_no.push(ds)
                }else{
                    i -= 1
                }
                
            }

            dats_all = [...dats_yes, ...dats_no]

            res.status(200).json({
                dats: dats_all,
                dats_yes,
                dats_no,
                inp_x,
                inp_y
            });

        })

}
