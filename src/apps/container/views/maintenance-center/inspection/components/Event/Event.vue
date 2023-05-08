<template>
  <div class="container margin-top">
    <div id="container">
      <BaseCard style="width: 100%">
        <header>
          <div class="card-title" style="margin-bottom: 20px">
            <span>资源使用量统计</span>
          </div>
        </header>

        <section class="content">
          <!-- 1 -->
          <div
            style="
              height: 330px;
              background-color: rgba(247, 249, 252);
              padding: 20px;
            "
          >
            <div style="font-size: 16px; font-weight: 500; margin-bottom: 16px">
              CPU
            </div>
            <div class="flexbox" style="margin-bottom: 12px">
              <div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="50"
                  height="54"
                  fill="currentColor"
                  class="bi bi-cpu"
                  viewBox="0 0 16 16"
                  color="#5200f5"
                >
                  <path
                    d="M5 0a.5.5 0 0 1 .5.5V2h1V.5a.5.5 0 0 1 1 0V2h1V.5a.5.5 0 0 1 1 0V2h1V.5a.5.5 0 0 1 1 0V2A2.5 2.5 0 0 1 14 4.5h1.5a.5.5 0 0 1 0 1H14v1h1.5a.5.5 0 0 1 0 1H14v1h1.5a.5.5 0 0 1 0 1H14v1h1.5a.5.5 0 0 1 0 1H14a2.5 2.5 0 0 1-2.5 2.5v1.5a.5.5 0 0 1-1 0V14h-1v1.5a.5.5 0 0 1-1 0V14h-1v1.5a.5.5 0 0 1-1 0V14h-1v1.5a.5.5 0 0 1-1 0V14A2.5 2.5 0 0 1 2 11.5H.5a.5.5 0 0 1 0-1H2v-1H.5a.5.5 0 0 1 0-1H2v-1H.5a.5.5 0 0 1 0-1H2v-1H.5a.5.5 0 0 1 0-1H2A2.5 2.5 0 0 1 4.5 2V.5A.5.5 0 0 1 5 0zm-.5 3A1.5 1.5 0 0 0 3 4.5v7A1.5 1.5 0 0 0 4.5 13h7a1.5 1.5 0 0 0 1.5-1.5v-7A1.5 1.5 0 0 0 11.5 3h-7zM5 6.5A1.5 1.5 0 0 1 6.5 5h3A1.5 1.5 0 0 1 11 6.5v3A1.5 1.5 0 0 1 9.5 11h-3A1.5 1.5 0 0 1 5 9.5v-3zM6.5 6a.5.5 0 0 0-.5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 0-.5-.5h-3z"
                  />
                </svg>
              </div>
              <div style="flex: 1; margin-left: 16px">
                <div style="font-size: 10px; line-height: 18px">总量</div>
                <div style="font-size: 20px">
                  368.00
                  <span style="font-size: 12px">核</span>
                </div>
              </div>
              <div style="flex: 1; margin-left: 16px">
                <div style="font-size: 10px; line-height: 18px">总使用率</div>
                <div style="font-size: 20px">
                  3.98
                  <span style="font-size: 12px">%</span>
                </div>
              </div>
            </div>
            <div>
              <div>
                <div style="margin-bottom: 12px">
                  <div style="font-size: 14px">global 集群总核数</div>
                  <div style="width: 260px; margin: 10px 0" class="flexbox">
                    <el-progress
                      :percentage="100"
                      :show-text="false"
                      color="#5200f5"
                    />
                    <span style="font-size: 12px; line-height: 6px">
                      176.00核
                    </span>
                  </div>
                </div>

                <div>
                  <div style="font-size: 14px">业务集群总核数</div>
                  <div style="width: 260px; margin: 10px 0" class="flexbox">
                    <el-progress
                      :percentage="100"
                      :show-text="false"
                      color="#5200f5"
                    />
                    <span style="font-size: 12px; line-height: 6px">
                      192.00核
                    </span>
                  </div>
                </div>
              </div>

              <div style="margin-top: 26px">
                <div style="margin-bottom: 12px">
                  <div style="font-size: 14px">global 集群使用率</div>
                  <div style="width: 260px; margin: 10px 0" class="flexbox">
                    <el-progress :percentage="4.61" :show-text="false" />
                    <span style="font-size: 12px; line-height: 6px">
                      {{ `${"4.61"}%` }}
                    </span>
                  </div>
                </div>

                <div>
                  <div style="font-size: 14px">业务集群使用率</div>
                  <div style="width: 260px; margin: 10px 0" class="flexbox">
                    <el-progress :percentage="3.41" :show-text="false" />
                    <span style="font-size: 12px; line-height: 6px">
                      {{ `${"3.41"}%` }}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- 2 -->
          <div
            style="
              height: 330px;
              background-color: rgba(247, 249, 252);
              padding: 20px;
            "
          >
            <div style="font-size: 16px; font-weight: 500; margin-bottom: 16px">
              内存
            </div>
            <!-- style="vertical-align: baseline" -->
            <div class="flexbox" style="margin-bottom: 12px">
              <div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="50"
                  height="54"
                  fill="currentColor"
                  class="bi bi-memory"
                  viewBox="0 0 16 16"
                  color="#00b2d6"
                >
                  <path
                    d="M1 3a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h4.586a1 1 0 0 0 .707-.293l.353-.353a.5.5 0 0 1 .708 0l.353.353a1 1 0 0 0 .707.293H15a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1H1Zm.5 1h3a.5.5 0 0 1 .5.5v4a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-4a.5.5 0 0 1 .5-.5Zm5 0h3a.5.5 0 0 1 .5.5v4a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-4a.5.5 0 0 1 .5-.5Zm4.5.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 .5.5v4a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-4ZM2 10v2H1v-2h1Zm2 0v2H3v-2h1Zm2 0v2H5v-2h1Zm3 0v2H8v-2h1Zm2 0v2h-1v-2h1Zm2 0v2h-1v-2h1Zm2 0v2h-1v-2h1Z"
                  />
                </svg>
              </div>
              <div style="flex: 1; margin-left: 16px">
                <div style="font-size: 10px; line-height: 18px">总量</div>
                <div style="font-size: 20px">
                  {{ "711.11" }}
                  <span style="font-size: 12px">Gi</span>
                </div>
              </div>
              <div style="flex: 1; margin-left: 16px">
                <div style="font-size: 10px; line-height: 18px">总使用率</div>
                <div style="font-size: 20px">
                  {{ "17.34" }}
                  <span style="font-size: 12px">%</span>
                </div>
              </div>
            </div>

            <div>
              <div>
                <div style="margin-bottom: 12px">
                  <div style="font-size: 14px">global 集群总容量</div>
                  <div style="width: 260px; margin: 10px 0" class="flexbox">
                    <el-progress
                      :percentage="100"
                      :show-text="false"
                      color="#00b2d6"
                    />
                    <span style="font-size: 12px; line-height: 6px">
                      340.10Gi
                    </span>
                  </div>
                </div>

                <div>
                  <div style="font-size: 14px">业务集群总量</div>
                  <div style="width: 260px; margin: 10px 0" class="flexbox">
                    <el-progress
                      :percentage="100"
                      :show-text="false"
                      color="#00b2d6"
                    />
                    <span style="font-size: 12px; line-height: 6px">
                      371.01Gi
                    </span>
                  </div>
                </div>
              </div>

              <div style="margin-top: 26px">
                <div style="margin-bottom: 12px">
                  <div style="font-size: 14px">global 集群使用率</div>
                  <div style="width: 260px; margin: 10px 0" class="flexbox">
                    <el-progress :percentage="14.61" :show-text="false" />
                    <span style="font-size: 12px; line-height: 6px">
                      {{ `${"14.61"}%` }}
                    </span>
                  </div>
                </div>

                <div>
                  <div style="font-size: 14px">业务集群使用率</div>
                  <div style="width: 260px; margin: 10px 0" class="flexbox">
                    <el-progress :percentage="20.35" :show-text="false" />
                    <span style="font-size: 12px; line-height: 6px">
                      {{ `${"20.35"}%` }}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- 3 -->
          <div
            style="
              height: 330px;
              background-color: rgba(247, 249, 252);
              padding: 20px;
            "
          >
            <div style="font-size: 16px; font-weight: 500; margin-bottom: 16px">
              磁盘
            </div>
            <div class="flexbox" style="margin-bottom: 12px">
              <div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="50"
                  height="54"
                  fill="currentColor"
                  class="bi bi-hdd"
                  viewBox="0 0 16 16"
                  color="#8bce27"
                >
                  <path
                    d="M4.5 11a.5.5 0 1 0 0-1 .5.5 0 0 0 0 1zM3 10.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0z"
                  />
                  <path
                    d="M16 11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V9.51c0-.418.105-.83.305-1.197l2.472-4.531A1.5 1.5 0 0 1 4.094 3h7.812a1.5 1.5 0 0 1 1.317.782l2.472 4.53c.2.368.305.78.305 1.198V11zM3.655 4.26 1.592 8.043C1.724 8.014 1.86 8 2 8h12c.14 0 .276.014.408.042L12.345 4.26a.5.5 0 0 0-.439-.26H4.094a.5.5 0 0 0-.44.26zM1 10v1a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-1a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1z"
                  />
                </svg>
              </div>
              <div style="flex: 1; margin-left: 16px">
                <div style="font-size: 10px; line-height: 18px">总容量</div>
                <div style="font-size: 20px">
                  {{ "11926.08" }}
                  <span style="font-size: 12px">Gi</span>
                </div>
              </div>
              <div style="flex: 1; margin-left: 16px">
                <div style="font-size: 10px; line-height: 18px">总使用率</div>
                <div style="font-size: 20px">
                  {{ "25.43" }}
                  <span style="font-size: 12px">%</span>
                </div>
              </div>
            </div>

            <div>
              <div>
                <div style="margin-bottom: 12px">
                  <div style="font-size: 14px">global 集群总容量</div>
                  <div style="width: 260px; margin: 10px 0" class="flexbox">
                    <el-progress
                      :percentage="100"
                      :show-text="false"
                      color="#8bce27"
                    />
                    <span style="font-size: 12px; line-height: 6px">
                      9223.65Gi
                    </span>
                  </div>
                </div>

                <div>
                  <div style="font-size: 14px">业务集群总容量</div>
                  <div style="width: 260px; margin: 10px 0" class="flexbox">
                    <el-progress
                      :percentage="100"
                      :show-text="false"
                      color="#8bce27"
                    />
                    <span style="font-size: 12px; line-height: 6px">
                      2702.43Gi
                    </span>
                  </div>
                </div>
              </div>

              <div style="margin-top: 26px">
                <div style="margin-bottom: 12px">
                  <div style="font-size: 14px">global 集群使用率</div>
                  <div style="width: 260px; margin: 10px 0" class="flexbox">
                    <el-progress :percentage="24.81" :show-text="false" />
                    <span style="font-size: 12px; line-height: 6px">
                      {{ `${"24.81"}%` }}
                    </span>
                  </div>
                </div>

                <div>
                  <div style="font-size: 14px">业务集群使用率</div>
                  <div style="width: 260px; margin: 10px 0" class="flexbox">
                    <el-progress :percentage="27.55" :show-text="false" />
                    <span style="font-size: 12px; line-height: 6px">
                      {{ `${"27.55"}%` }}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </BaseCard>

      <BaseCard style="width: 100%">
        <header>
          <div class="card-title" style="margin-bottom: 20px">
            <span>平台资源个数</span>
          </div>
        </header>

        <div class="container-box">
          <div class="box" v-for="item in data1" :key="item.title">
            <i :class="item.icon" style="color: #409eff" />
            <span style="margin-left: 5px">{{ item.title }}</span>
            <div class="numStyle">{{ item.num }}</div>
          </div>
        </div>

        <div class="container-box">
          <div class="box" v-for="item in data2" :key="item.title">
            <i :class="item.icon" style="color: #409eff" />
            <span style="margin-left: 5px">{{ item.title }}</span>
            <div class="numStyle">{{ item.num }}</div>
          </div>
        </div>
      </BaseCard>
    </div>
  </div>
</template>

<script>
import { nanoid } from "nanoid";

export default {
  name: "Node",
  components: {},
  props: {},
  data() {
    return {
      rowCenter: {
        "max-width": "520px",
        "word-break": "break-all",
        display: "table-cell",
        "vertical-align": "middle",
        "margin-left": "120px",
        "margin-top": "-20px",
        color: "#A9A9A9",
      },

      data1: [
        { title: "集群个数", icon: "el-icon-document", num: 2 },
        { title: "节点个数", icon: "el-icon-document", num: 23 },
        { title: "容器组个数", icon: "el-icon-document", num: 473 },
        { title: "项目个数", icon: "el-icon-document", num: 10 },
        { title: "自定义应用个数", icon: "el-icon-document", num: 2 },
      ],

      data2: [
        { title: "计算组件个数", icon: "el-icon-document", num: 231 },
        { title: "微服务个数", icon: "el-icon-document", num: 0 },
        { title: "流水线个数", icon: "el-icon-document", num: 4 },
        { title: "流水线当天累计执行次数", icon: "el-icon-document", num: 0 },
      ],
    };
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    setMinWidthEmpty(val) {
      // 无数据的情况下，给请选择提示设置最小宽度
      let domEmpty = document.getElementsByClassName(
        "el-select-dropdown__empty"
      );
      if (domEmpty.length > 0) {
        domEmpty[0].style["min-width"] = val.srcElement.clientWidth + 2 + "px";
      }
    },

    format(percentage) {
      return percentage === 100 ? "176.00核" : `${percentage}%`;
    },
  },
};
</script>
<style lang="scss" scoped>
// #container {
//   display: flex;
//   flex-wrap: wrap; /* 让子元素自动换行 */
//   justify-content: space-between; /* 将子元素平均分布到容器的两端 */
// }
// .box {
//   width: calc(
//     33.33% - -150px
//   ); /* 让每个子元素占据 1/3 宽度（减去 margin 的值） */
//   margin-bottom: 10px; /* 设置子元素的 margin-bottom */
// }
// .flexBox {
//   display: flex;
//   justify-content: space-between;
//   align-items: center;
// }
.content {
  display: grid;
  grid-gap: 20px;
  grid-template-columns: repeat(3, 1fr);
}
.el-progress {
  width: 200px;
}
.numStyle {
  font-size: 40px;
  margin-top: 30px;
  // color: #000100;
}
.container-box {
  display: grid;
  grid-template-columns: repeat(
    4,
    1fr
  ); /* 将容器分成 5 列，并设置每列的宽度为 1fr */
  grid-gap: 5px; /* 设置元素之间的距离为 10px */
}
.box {
  height: 100px;
  // background-color: #ccc;
  position: relative; /* 让伪元素相对于父元素定位 */
  margin-bottom: 20px;
}
.box::after {
  content: "";
  border-left: 2px solid #ccc;
  position: absolute; /* 将伪元素设置为绝对定位 */
  top: 0;
  bottom: 0;
  right: 12px; /* 调整伪元素的位置 */
}
// .box:last-child::after {
//   display: none; /* 去掉第一个 div 元素前面的分割线 */
// }
</style>