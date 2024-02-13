// Select all elements of the user input form and the output table:
const forminput_p_1 = document.getElementById("forminput_p_1");
const forminput_p_2 = document.getElementById("forminput_p_2");
const forminput_d_1 = document.getElementById("forminput_d_1");
const forminput_d_2 = document.getElementById("forminput_d_2");
const submit_button = document.getElementById("submit_button");
const result_p_code_1 = document.getElementById("result_p_code_1");
const result_p_code_2 = document.getElementById("result_p_code_2");
const result_d_code_1 = document.getElementById("result_d_code_1");
const result_d_code_2 = document.getElementById("result_d_code_2");
const result_antigen_mismatches = document.getElementById("antigen_mismatches");
const result_allelic_mismatches = document.getElementById("allelic_mismatches");
let antigen_mismatches;
let allelic_mismatches;

function main_func(){
    // Variables for the four hla codes the user entered
    let p_code_1 = forminput_p_1.value.trim();
    let p_code_2 = forminput_p_2.value.trim();
    let d_code_1 = forminput_d_1.value.trim();
    let d_code_2 = forminput_d_2.value.trim();

    // Take care of special case of X
    // Replace X with homozygous allele
    if (p_code_1=="x" || p_code_1=="X"){
        p_code_1=p_code_2;
    } else if (p_code_2=="x" || p_code_2=="X"){
        p_code_2=p_code_1;
    }

    if (d_code_1=="x" || d_code_1=="X"){
        d_code_1=d_code_2;
    } else if (d_code_2=="x" || d_code_2=="X"){
        d_code_2=d_code_1;
    }    

    // Now we have to split each code by the colon
    // Find the index of each colon
    const p_colon_1 = p_code_1.indexOf(":");
    const p_colon_2 = p_code_2.indexOf(":");
    const d_colon_1 = d_code_1.indexOf(":");
    const d_colon_2 = d_code_2.indexOf(":");

    // Slice before and after the colon
    // This will give the 8 pieces of code we're trying to compare
    // Patient
    const p_code_1_1 = p_code_1.slice(0,p_colon_1);
    const p_code_1_2 = p_code_1.slice(p_colon_1+1,);
    const p_code_2_1 = p_code_2.slice(0,p_colon_2);
    const p_code_2_2 = p_code_2.slice(p_colon_2+1,)
    // Donor;
    const d_code_1_1 = d_code_1.slice(0,d_colon_1);
    const d_code_1_2 = d_code_1.slice(d_colon_1+1,);
    const d_code_2_1 = d_code_2.slice(0,d_colon_2);
    const d_code_2_2 = d_code_2.slice(d_colon_2+1,);

    // Arrays of digits and whole codes to compare
    let arr_p_firstdigits = [p_code_1_1, p_code_2_1];
    let arr_d_firstdigits = [d_code_1_1, d_code_2_1];
    let arr_p = [p_code_1, p_code_2];
    let arr_d = [d_code_1, d_code_2];

    let all_codes = [p_code_1_1, p_code_1_2, p_code_2_1, p_code_2_2, d_code_1_1, d_code_1_2, d_code_2_1, d_code_2_2];

    // Check for any allele strings like PAYK 
    // If any codes are letters, then allele result is ND
    // Use regex to find letters
    const regex = new RegExp("[a-zA-Z]+");
    let allelestringexists = false;

    for (let i=0; i<all_codes.length; i++){        
        if (regex.test(all_codes[i]) == true){
            allelestringexists = true;
        }        
    }

    // If the code contains an allele string, then ND at allele level
    if (allelestringexists == true){        
            allelic_mismatches = "ND";
            if (String(arr_p_firstdigits.sort()) == String(arr_d_firstdigits.sort())){
                antigen_mismatches = "0";
            } else if (arr_d_firstdigits.includes(p_code_1_1) == false && arr_d_firstdigits.includes(p_code_2_1) == false){
                antigen_mismatches = "2";
            } else {
                antigen_mismatches = "1";
            }  
    }
    // If the first two digits match, report antigen level as ND and report mismatch at allelic level
    else if (String(arr_p_firstdigits.sort()) == String(arr_d_firstdigits.sort())){
        antigen_mismatches = "ND";
        if (String(arr_p.sort()) == String(arr_d.sort())){
            allelic_mismatches = "0";
        } else if (arr_d.includes(p_code_1) == false && arr_d.includes(p_code_2) == false){
            allelic_mismatches = "2";
        } else {
            allelic_mismatches = "1";
        }
    } 
    // Else, if first two digits DONT match, report allelic level as ND and report mismatch at antigen level
    else { 
        allelic_mismatches = "ND";
        if (String(arr_p_firstdigits.sort()) == String(arr_d_firstdigits.sort())){
            antigen_mismatches = "0";
        } else if (arr_d_firstdigits.includes(p_code_1_1) == false && arr_d_firstdigits.includes(p_code_2_1) == false){
            antigen_mismatches = "2";
        } else {
            antigen_mismatches = "1";
        }
    }    

    // Show user final results
    result_p_code_1.innerHTML = `${forminput_p_1.value}`;
    result_p_code_2.innerHTML = `${forminput_p_2.value}`;
    result_d_code_1.innerHTML = `${forminput_d_1.value}`;
    result_d_code_2.innerHTML = `${forminput_d_2.value}`;
    result_antigen_mismatches.innerHTML = `${antigen_mismatches}`;
    result_allelic_mismatches.innerHTML = `${allelic_mismatches}`;

} // End main_func

submit_button.addEventListener("click", main_func);