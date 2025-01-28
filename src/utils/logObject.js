export default function printCurrentInfo(object) {
    try {
        return JSON.parse(JSON.stringify(object));
    } catch (error) {
        return null;
    }
}