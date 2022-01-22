// define(['require', 'exports', 'module'], function(require, exports, module) {
//     class Cart {
//       add(item) {
//             console.log("m2模块");
//             console.log(`添加商品：${item}`, item)
//       }
//     }
//     exports.Cart = Cart;
//   })

// // 忽略不需要的依赖导入
// define(['exports'], function(exports) {
//     class Cart {
//       add(item) {
//         console.log(`添加商品：${item}`,item)
//       }
//     }
//     exports.Cart = Cart;
//   })

  // 如果是依赖的导入为：require, exports, module，也可以省略依赖导入声明
  define(function(require, exports, module) {
    class Cart {
      add(item) {
        console.log(`添加商品：${item}`,item)
      }
    }
    exports.Cart = Cart;
  })
