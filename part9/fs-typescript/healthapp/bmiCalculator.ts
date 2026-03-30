const calculateBmi = (height: number, weight: number): string => {
    const bmi = Math.round((weight / (height / 100) ** 2) * 100) / 100;
    if (bmi >= 30) {
        return "Obese range";
    } else if (bmi >= 25) {
        return "Overweight range";
    } else if (bmi >= 18.5) {
        return "Normal range";
    } else {
        return "Underweight range";
    }
};

console.log(calculateBmi(180, 74));
