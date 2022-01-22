export default function RMB(val) {
    // 给价格
    return "￥" + (val / 100).toFixed(2);
}