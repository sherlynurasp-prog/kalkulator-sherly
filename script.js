const display = document.getElementById("display");
const buttons = document.querySelectorAll(".buttons button");

let angkaPertama = null;
let operator = null;
let menungguAngkaKedua = false;

// Fungsi untuk menampilkan angka
function tampilkanAngka(angka) {
    display.value = angka;
}

// Fungsi untuk menghitung
function hitung() {
    const angkaKedua = parseFloat(display.value);

    if (angkaPertama === null || operator === null) {
        return;
    }

    let hasil;

    switch (operator) {
        case "+":
            hasil = angkaPertama + angkaKedua;
            break;

        case "-":
            hasil = angkaPertama - angkaKedua;
            break;

        case "×":
            hasil = angkaPertama * angkaKedua;
            break;

        case "÷":
            hasil = angkaPertama / angkaKedua;
            break;
    }

    if (!Number.isFinite(hasil)) {
        tampilkanAngka("Error");
    } else {
        tampilkanAngka(
            parseFloat(hasil.toPrecision(12)).toString()
        );
    }

    angkaPertama = null;
    operator = null;
    menungguAngkaKedua = true;
}

// Fungsi ketika tombol diklik
buttons.forEach(button => {
    button.addEventListener("click", () => {

        const nilai = button.textContent.trim();

        // Tombol C
        if (button.classList.contains("clear")) {
            tampilkanAngka("0");
            angkaPertama = null;
            operator = null;
            menungguAngkaKedua = false;
            return;
        }

        // Tombol hapus satu angka
        if (button.classList.contains("delete")) {
            if (display.value !== "Error") {
                display.value =
                    display.value.length > 1
                    ? display.value.slice(0, -1)
                    : "0";
            }
            return;
        }

        // Tombol angka
        if (!isNaN(nilai)) {
            if (display.value === "Error" || menungguAngkaKedua) {
                tampilkanAngka(nilai);
                menungguAngkaKedua = false;
            } else {
                tampilkanAngka(
                    display.value === "0"
                    ? nilai
                    : display.value + nilai
                );
            }
            return;
        }

        // Tombol koma/desimal
        if (nilai === ".") {
            if (menungguAngkaKedua || display.value === "Error") {
                tampilkanAngka("0.");
                menungguAngkaKedua = false;
            } else if (!display.value.includes(".")) {
                display.value += ".";
            }
            return;
        }

        // Tombol persen
        if (nilai === "%") {
            if (display.value !== "Error") {
                tampilkanAngka(
                    (parseFloat(display.value) / 100).toString()
                );
            }
            return;
        }

        // Tombol operator
        if (["+", "-", "−", "×", "÷"].includes(nilai)) {
            if (nilai === "−") {
                operator = "-";
            } else {
                operator = nilai;
            }

            angkaPertama = parseFloat(display.value);
            menungguAngkaKedua = true;
            return;
        }

        // Tombol sama dengan
        if (button.classList.contains("equal")) {
            hitung();
        }

    });
});