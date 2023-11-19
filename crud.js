const input = require("prompt-sync")();

let dataMahasiswa = {
  2102020105: {
    nama: "Krisna Rizki Pratama",
    kelas: "A3",
    prodi: "Informatika",
    telp: "082281258929",
    alamat: "Sukajadi",
  },
};
let nama, kelas, prodi, telp, alamat;
// Function

function lihatMahasiswa() {
  console.clear();
  console.log(`
 ${"=".repeat(101)}
|${"Selamat datang di".padStart((101 - 17) / 2 + 17, " ").padEnd(101, " ")}|
|${"Universitas Wibu Indonesia"
    .padStart((101 - 26) / 2 + 26, " ")
    .padEnd(101, " ")}|
|${"=".repeat(101)}|`);
  console.log(
    `|${"Nim".padStart((12 - 3) / 2 + 3, " ").padEnd(12, " ")}|${"Nama"
      .padStart((30 - 4) / 2 + 4, " ")
      .padEnd(30, " ")}|${"Kelas"
      .padStart((8 - 5) / 2 + 5, " ")
      .padEnd(8, " ")}|${"Prodi"
      .padStart((16 - 5) / 2 + 5, " ")
      .padEnd(16, " ")}|${"Telp"
      .padStart((14 - 4) / 2 + 4, " ")
      .padEnd(14, " ")}|${"Alamat"
      .padStart((16 - 6) / 2 + 6, " ")
      .padEnd(16, " ")}|
|${"-".repeat(12)}|${"-".repeat(30)}|${"-".repeat(8)}|${"-".repeat(
      16
    )}|${"-".repeat(14)}|${"-".repeat(16)}|`
  );
  for (daftarMahasiswa in dataMahasiswa) {
    const { nama, kelas, prodi, telp, alamat } = dataMahasiswa[daftarMahasiswa];
    console.log(
      `|${daftarMahasiswa
        .padStart(
          (12 - daftarMahasiswa.length) / 2 + daftarMahasiswa.length,
          " "
        )
        .padEnd(12, " ")}|${nama
        .padStart((30 - nama.length) / 2 + nama.length, " ")
        .padEnd(30, " ")}|${kelas
        .padStart((8 - kelas.length) / 2 + kelas.length, " ")
        .padEnd(8, " ")}|${prodi
        .padStart((16 - prodi.length) / 2 + prodi.length, " ")
        .padEnd(16, " ")}|${telp
        .padStart((14 - telp.length) / 2 + telp.length, " ")
        .padEnd(14, " ")}|${alamat
        .padStart((16 - alamat.length) / 2 + alamat.length, " ")
        .padEnd(16, " ")}|`
    );
  }
  console.log(` ${"=".repeat(101)}`);
  input("\nTekan enter untuk keluar...");
}

function inputData() {
  nama = input("Masukkan nama: ");
  kelas = input("Masukkan kelas: ");
  prodi = input("Masukkan prodi: ");
  telp = input("Masukkan telp (+62): ");
  alamat = input("Masukkan alamat: ");

  function validasiInput() {
    function validasiTelp() {
      if (!(telp.startsWith("62") || telp.startsWith("+62"))) {
        // Mengecek apakah no HP diawali dengan +62, kemudian replace menjadi 0
        return false;
      }
      telp = telp.replace("+62", "0").replace("62", "0");

      const datfarAbjad = []; // penampung abjad
      for (let i = 97; i <= 122; i++) {
        // Lowercase abjad
        datfarAbjad.push(String.fromCharCode(i));
      }

      for (let i = 65; i <= 90; i++) {
        // Uppercase abjad
        datfarAbjad.push(String.fromCharCode(i));
      }

      for (let abjad of datfarAbjad) {
        // Mengecek apakah terdapat abjad didalam no HP
        if (telp.indexOf(abjad) !== -1) {
          return false;
        }
      }
      return true;
    }

    if (
      nama.length === 0 ||
      kelas.length === 0 ||
      prodi.length === 0 ||
      alamat.length === 0
    ) {
      // console.log("Nama,kelas,prodi,telp atau alamat ada yang kosong !");
      return false;
    }

    const daftarAngka = [];
    for (let i = 0; i < 10; i++) {
      daftarAngka.push(i);
    }
    for (let angka of daftarAngka) {
      if (nama.indexOf(angka) !== -1 || prodi.indexOf(angka) !== -1) {
        // console.log("Nama atau Prodi tidak boleh mengandung angka !");
        return false;
      }
    }

    if (!validasiTelp()) {
      // console.log("No Telp tidak valid !");
      return false;
    }

    return true;
  }
  return validasiInput();
}

function tambahMahasiswa() {
  if (inputData()) {
    let daftarNim = [];
    if (Object.keys(dataMahasiswa).length === 0) {
      daftarNim = [2102020104];
    }
    for (let nim in dataMahasiswa) {
      daftarNim.push(nim);
    }
    let templateNim = daftarNim[daftarNim.length - 1];
    templateNim = parseInt(templateNim);

    dataMahasiswa[templateNim + 1] = {
      nama: nama,
      kelas: kelas,
      prodi: prodi,
      telp: telp,
      alamat: alamat,
    };
    console.log("\nData berhasil ditambahkan !\n");
    input("Press Enter...");
  } else {
    let panduan = input(
      "\nData gagal ditambahkan !\nPastikan anda mengisi data dengan benar,\napakah anda ingin melihat panduan isi data ? [y/n]: "
    ).toLowerCase();
    if (panduan === "y") {
      panduanData();
    }
  }
}

function panduanData() {
  console.clear();
  console.log(`
  ===========================================================
 |                     Selamat Datang di                     |
 |                Universitas Wibu Indonesia                 |
 |===========================================================|
 |   Panduan pengisian data :                                |
 |                                                           |
 |   1. Nama,kelas,prodi,telp dan                            |                            
 |      alamat tidak boleh kosong                            |
 |                                                           |
 |   2. Nama dan prodi tidak boleh                           |
 |      mengandung angka                                     |
 |                                                           |
 |   3. Untuk saat ini no telp                               |
 |      harus diawali dengan (+62)                           |
 |      atau (62)                                            |
 |                                                           |
 |   4. No telp tidak boleh                                  |
 |      mengandung abjad                                     |
 |                                                           |
 | Setelah membaca panduan ini, anda diharapkan mengerti     |
 | cara mengisi data pada program ini.                       |
  ===========================================================
`);
  input("Press enter...");
}

function updateMahasiswa() {
  let nimUpdate = input("Masukkan Nim yang ingin di update: ");

  if (nimUpdate in dataMahasiswa) {
    if (inputData()) {
      dataMahasiswa[nimUpdate] = {
        nama: nama,
        kelas: kelas,
        prodi: prodi,
        telp: telp,
        alamat: alamat,
      };
      console.log("\nData berhasil di update !");
      input("Press enter...");
    } else {
      let panduan = input(
        "\nData gagal ditambahkan !\nPastikan anda mengisi data dengan benar,\napakah anda ingin melihat panduan isi data ? [y/n]: "
      ).toLowerCase();
      if (panduan === "y") {
        panduanData();
      }
    }
  } else {
    console.log("Nim tidak ditemukan !");
    input("Tekan enter...");
  }
}
function deleteMahasiswa() {
  let nimDelete = input("Masukkan Nim yang ingin di hapus: ");
  if (nimDelete in dataMahasiswa) {
    delete dataMahasiswa[nimDelete];
    console.log("Data berhasil dihapus !");
    input("Tekan enter untuk keluar...");
  } else {
    console.log("Nim tidak ditemukan !");
    input("Tekan enter untuk keluar...");
  }
}

let program = true;
while (program) {
  console.clear();
  console.log(`
 ===========================================================
|                     Selamat Datang di                     |
|                Universitas Wibu Indonesia                 |
|===========================================================|
|                                                           |
|   1. Lihat  Mahasiswa                                     |
|   2. Tambah Mahasiswa                                     |
|   3. Update Mahasiswa                                     |
|   4. Delete Mahasiswa                                     |
|   5. Exit                                                 |
|                                                           |
 ===========================================================
`);
  const pilih = parseInt(input("Pilih : "));
  switch (pilih) {
    case 1:
      lihatMahasiswa();
      break;
    case 2:
      tambahMahasiswa();
      break;
    case 3:
      updateMahasiswa();
      break;
    case 4:
      deleteMahasiswa();
      break;
    case 5:
      program = false;
      console.log("Bye !");
      break;
    default:
      console.log("Pilihan tidak tersedia !");
  }
}
