let BlockUtils = {
    overlap(a, b) {
        let a1 = a.startFrame;
        let a2 = a.endFrame - 1;
        let b1 = b.startFrame;
        let b2 = b.endFrame - 1;
        return (a1 >= b1 && a1 <= b2) ||
        (a2 >= b1 && a2 <= b2) ||
        (b1 >= a1 && b1 <= a2) ||
        (b2 >= a1 && b2 <= a2);
    },
    getHumanName(s) {
        let last = s.lastIndexOf(".");
        let stripped = s.slice(last + 12, -5);
        return stripped;
    }
}

export default BlockUtils;