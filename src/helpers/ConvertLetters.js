import Swal from "sweetalert2";

export const convertLetters = (letter) => {
    
	switch (letter) {
        case 'A':
            return 1;
        case 'B':
            return 2;
        case 'C':
            return 3;
        case 'D':
            return 4;
        case 'E':
            return 5;
        case 'F':
            return 6;
        case 'G':
            return 7;
        case 'H':
            return 8;
        case 'I':
            return 9;
        case 'J':
            return 10;
        default:
            Swal.fire({
                title: "ERROR!",
                text: "Ingresa el comando correctamente!",
                icon: "info"
            });
    }

}
