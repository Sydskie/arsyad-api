<?php

$mahasiswa = [
    [
        "nama"  =>  "Zarkasih Arsyad Rangkuti",
        "nim"   =>  "2217020059",
        "email" =>  "zarkasiharsyad1508@gmail.com"
    ],
    [
        "nama"  =>  "Nailah Nurjannah",
        "nim"   =>  "219738493",
        "email" =>  "nailanurjannah299@gmail.com"
    ]   
];

$data = json_encode($mahasiswa);
echo   $data;
?>