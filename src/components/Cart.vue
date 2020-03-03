<template>
  <div>
    <div v-if="homelist.length">
      <table>
        <!-- ! 表格头部    -->
        <thead>
          <tr>
            <th>书籍名称</th>
            <th>出版日期</th>
            <th>价格</th>
            <th>购买数量</th>
            <th>操作</th>
          </tr>
        </thead>
        <!-- ! 表格body -->
        <tbody>
          <tr v-for="(item, index) in homelist" :key="index">
            <td>{{ item.name }}</td>
            <td>{{ item.date }}</td>
            <td>{{ item.price | showPrice }}</td>
            <td>
              <button @click="sub(index)" :disabled="item.count <= 1"><i class="el-icon-circle-plus"></i></button>
              
              {{ item.count }}
              <button @click="add(index)"><i class="el-icon-remove"></i></button>
              
            </td>
            <!-- <td><button @click="btnClick(index)">移除</button></td> -->
            <td><el-button type="primary" icon="el-icon-delete" size='mini'@click="btnClick(index)"></el-button></td>
          </tr>
        </tbody>
      </table>
    </div>

    <div v-else><h3>购物车空空如也...</h3></div>
    <div>
      <h3>总价格：{{ totalPrice | showPrice }}</h3>
    </div>
  </div>
</template>

<script>
export default {
  name: "Cart",
  data() {
    return {
      homelist: [
        {
          id: 1,
          name: '《算法导论》',
          date: '2006-9',
          price: 85.00,
          count: 1
        },
        {
          id: 2,
          name: '《编程艺术》',
          date: '2010-6',
          price: 105.00,
          count: 1
        },
        {
          id: 3,
          name: '《Python入门》',
          date: '2001-9',
          price: 98.00,
          count: 1
        },
        {
          id: 4,
          name: '《Javc精通》',
          date: '2002-2',
          price: 115.00,
          count: 1
        },
      ]
    }
  },

  computed: {
    totalPrice() {
      let totalPrice = 0
      for (let item of this.homelist) {
        totalPrice += item.price * item.count
      }
      return totalPrice
    },

  },
  methods: {
    sub(index) {
      this.homelist[index].count --
    },

    add(index) {
      this.homelist[index].count ++
    },

    btnClick(index) {
      this.homelist.splice(index, 1)
    }
  },
  filters: {
    showPrice(price) {
      return '￥' + price.toFixed(2)
    }
  }

};
</script>

// ! CSS样式
<style scoped>
table {
  border: 1px solid #e9e9e9;
  border-collapse: collapse;
  border-spacing: 0;
  margin-top: 20px;
  margin-left: 20px;
}

th,
td {
  padding: 8px 16px;
  border: 1px solid #e9e9e9;
  text-align: left;
}

th {
  background-color: #f7f7f7;
  color: #5c6b77;
  font-weight: 600;
}

</style>
