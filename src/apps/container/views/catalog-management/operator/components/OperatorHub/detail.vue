<template>
  <div class="create-container">
    <BaseCard>
      <header>
        <div style="display: flex; align-items: center">
          <div style="margin-right: 12px">
            <svg-icon icon-class="skill" style="width: 44px; height: 46px" />
          </div>

          <div style="flex: 1 1 0%">
            <div style="font-size: 20px; line-height: 28px">
              {{ titleName }}
            </div>
            <div class="noteStyle">
              clickhouse
              是一个开源的面向专栏的数据库管理系统，能够实时生成分析数据报告。
            </div>
          </div>

          <div style="float: right">
            <el-button type="primary" @click="handleDeploy">部署</el-button>
          </div>
        </div>
      </header>
      <el-divider></el-divider>

      <section>
        <el-row :gutter="24" style="margin-top: 14px; margin-left: 20px">
          <el-col
            v-for="item in baseInfoData"
            :key="item.label"
            :span="12"
            class="label-value"
          >
            <span>{{ item.label }} </span>: &nbsp;&nbsp;
            <span v-if="item.label == '供应商'">
              <span class="cursor-pointer">
                <i class="el-icon-link" @click="handleToPlatform">{{
                  item.value
                }}</i>
              </span>
            </span>
            <span v-else>
              {{ item.value ? item.value : "-" }}
            </span>
          </el-col>
        </el-row>
      </section>
    </BaseCard>

    <el-row :gutter="24">
      <el-col :xs="24" :sm="24" :lg="24">
        <BaseCard>
          <el-tabs v-model="activeName">
            <el-tab-pane label="详情信息" name="1">
              <section class="component-div">
                <!-- 1 -->
                <div style="padding: 0 16px" v-if="titleName == 'Ck Operator'">
                  <h2 style="margin-bottom: 16px">{{ "ClickHouse" }}</h2>
                  <p>
                    ClickHouse
                    是一个开源的面向专栏的数据库管理系统，能够实时生成分析数据报告。查看
                    ClickHouse 文档 可以获得更多的信息。
                  </p>
                  <h2 style="margin-bottom: 16px">
                    {{ "ClickHouse Operator" }}
                  </h2>
                  <p>
                    ClickHouse Operator
                    可以自动创建、更改或删除ClickHouse集群环境中的节点。
                  </p>
                </div>
                <!-- 2 -->
                <div style="padding: 0 16px" v-if="titleName == 'DevOps Tools'">
                  <h1 style="margin-bottom: 16px">{{ "DevOps Tools" }}</h1>
                  <h2 style="margin-bottom: 16px">{{ "注意" }}</h2>
                  <p>Gitea: 支持框架为 ARM、x86</p>
                  <p>Gitlab: 支持框架为 x86</p>
                  <p>Jenkins: 支持框架为 ARM、x86</p>
                  <p>Harbor: 支持框架为 ARM、x86</p>
                  <p>Sonarqube: 支持框架为 ARM、x86</p>
                  <p>Nexus: 支持框架为 ARM、x86</p>
                  <p>Testlink: 支持框架为 x86</p>
                  <p>Gitlab-Official: 支持框架为 x86</p>
                  <h2 style="margin-bottom: 16px">{{ "介绍" }}</h2>
                  <p>
                    DevOps Tools 是一个用部署可集成在 DevOps
                    中使用的外部工具链集合，包括
                    Jenkins、Gitlab、Harbor、Sonarqube
                    等，在创建实例时，用户可根据实际用途，选择"自动集成到 DevOps
                    工具链"或"不集成到 DevOps 工具链"两种形式。
                  </p>
                  <p><strong>Gitea</strong></p>
                  <p>
                    Gitea 是一个轻量级代码托管解决方案，它可以运行在任何 Go
                    能够编译的平台。
                  </p>
                  <p><strong>Gitlab</strong></p>
                  <p>
                    Gitlab 是一个开源的版本控制系统，它使用 Git
                    作为代码管理工具，并在此基础上搭建起来的 web 服务。
                  </p>
                  <p>
                    该工具为 Gitlab
                    的非官方正式版本，存在一些暂时无法修复的严重漏洞，强烈建议用户使用官方正式版本
                    GitlabOfficial。该工具 Gitlab 会在下一个版本 v3.7
                    中下线。已经在使用该 Gitlab
                    的用户，请参考运维手册中基础运维的部分，根据 DevOps
                    模块的《Gitlab 数据迁移至 GitlabOfficial
                    方案》文档，尽快完成向 GitlabOfficial 工具迁移的工作。
                  </p>
                  <p><strong>Gitlab-Official</strong></p>
                  <p>
                    Gitlab-Official 是一个开源的版本控制系统，它使用 Git
                    作为代码管理工具，并在此基础上搭建起来的 web 服务。
                  </p>
                  <p><strong>Jenkins</strong></p>
                  <p>
                    Jenkins 是基于 Java
                    开发的一个重要的持续集成工具，它常与版本控制工具、构建工具结合使用。常用的版本控制工具有
                    SVN、GIT，构建工具有 Maven、Ant、Gradle。
                  </p>
                  <p><strong>Harbor</strong></p>
                  <p>
                    Harbor 是构建企业级私有 docker 镜像仓库的开源解决方案，它是
                    Docker Registry 的更高级封装，它具体友好的 Web UI
                    界面，角色和用户权限管理，用户操作审计等功能。
                  </p>
                  <p><strong>Sonarqube</strong></p>
                  <p>
                    Sonarqube
                    是一个代码质量管理工具，它可以迅速定位代码中潜在或明显的错误。
                  </p>
                  <p><strong>Nexus</strong></p>
                  <p>
                    Nexus
                    是一个强大的仓库管理工具，能够极大地简化内部仓库的维护和外部仓库的访问。
                  </p>
                  <p><strong>Testlink</strong></p>
                  <p>
                    Testlink
                    是基于web的测试用例管理工具，主要功能是测试用例的创建、管理和执行。
                  </p>
                </div>
                <!-- 3 -->
                <div
                  style="padding: 0 16px"
                  v-if="titleName == 'Etcd-Operator'"
                >
                  <h1 style="margin-bottom: 16px">{{ "Etcd-Operator" }}</h1>
                  <p>
                    etcd
                    operator在Kubernetes上创建维护了高可用性的etcd集群，使工程师能够方便地部署和管理其应用程序地etcd集群。
                  </p>
                  <p>
                    etcd是一个分布式键值存储，它提供了一种跨机器集群存储数据的可靠方法。etcd是开源的，可在GitHub上获得。etcd可以在网络分区期间优雅地处理leader选举，并且可以容忍包括leader在内地机器故障。
                  </p>
                  <p>
                    <strong
                      >支持版本：Kubernetes 1.8+、etcd
                      3.2.13/3.3.24/3.4.14，其他大于etcd
                      3.2.13的版本需要联网使用或自行上传到私有仓库</strong
                    >
                  </p>

                  <h3>读写etcd</h3>
                  <p>通过命令行工具etcdctl使用端口转发与etcd通信</p>
                  <div
                    style="
                      width: 100%;
               
                      padding: 16px;
                      background: #f6f8fa;
                      border-radius: 6px;
                      font-size:90%
                      line-height:1.45
                    "
                  >
                    <code>{{
                      "$ etcdctl --namespace default port-forward service/example-client 2379:2379"
                    }}</code>
                    <br />
                    <code>{{
                      "$ etcdctl --endpoints http://127.0.0.1:2379 get /"
                    }}</code>
                  </div>

                  <p>或者使用自动生成的Kubernetes服务直接访问API</p>
                  <div
                    style="
                      width: 100%;
                    
                      padding: 16px;
                      background: #f6f8fa;
                      border-radius: 6px;
                      font-size:90%
                      line-height:1.45
                    "
                  >
                    <code>{{
                      "$ etcdctl --endpoints http://example-client.default.svc:2379 get /"
                    }}</code>
                  </div>

                  <p>
                    在将etcd集群公开在命名空间或集群之外之前，一定要确保它的安全(请参阅公共配置)。
                  </p>

                  <h3>支持的功能</h3>
                  <ul style="margin-top: 0.25em; padding-left: 2em">
                    <li>
                      <strong>高可用性</strong>
                      ectd的多个实例通过网络安全地组合到一起。单个故障或网络问题将被透明处理，以保持集群正常运行。
                    </li>
                    <li>
                      <strong>自动更新</strong>
                      更新到一个新的etcd版本就像所有Kubernetes地滚动更新一样。只要声明所需的版本，etcd服务就会自动安全的滚动更新到新的版本。
                    </li>
                    <li>
                      <strong>备份恢复</strong>
                      etcd operator可以备份和恢复etcd的数据。
                    </li>
                  </ul>

                  <h3>公共配置</h3>
                  <ul style="margin-top: 0.25em; padding-left: 2em">
                    <li>
                      <strong>配置TLS</strong>
                      使用kubernetes secret资源指定静态TLS证书
                    </li>
                    <li>
                      <strong>配置Node Selector和Affinity</strong>
                      指定etcd pods在所有节点上的选举策略
                    </li>
                    <li>
                      <strong>配置资源限额</strong>
                      设置etcd pods在kubernetes上的资源限额
                    </li>
                    <li>
                      <strong>配置存储类型</strong>
                      根据需求设置存储类型
                    </li>
                  </ul>
                </div>
                <!-- 4 -->
                <div style="padding: 0 16px" v-if="titleName == 'Kafka'">
                  <h1 style="margin-bottom: 16px">{{ titleName }}</h1>
                  <h3 style="margin: 18px 0">介绍</h3>
                  <p>
                    Kafka是由Apache软件基金会开发的一个高吞吐量的分布式发布订阅消息系统，可以高效的处理消费者在网站中的所有动作流数据。Kafka
                    Operator 提供了一种在 Kubernetes 上运行 Apache Kafka
                    集群的办法，支持多种灵活部署配置。**支持版本：Kafka
                    2.4.0、2.4.1、2.5.0、2.6.0、2.7.0**
                  </p>
                  <h3 style="margin: 18px 0">支持功能</h3>
                  <ul style="margin-top: 0.25em; padding-left: 2em">
                    <li>
                      <strong>管理Kafka集群</strong>
                      部署和管理此复杂应用程序的所有组件，包括传统上难以管理的依赖项，例如Apache
                      Zookeeper。
                    </li>
                    <li>
                      <strong>包括Kafka Connect</strong>
                      允许配置通用数据源和接收器，以将数据移入和移出Kafka集群。
                    </li>
                    <li>
                      <strong>topic 管理</strong>
                      在集群中创建和管理Kafka topic。
                    </li>
                    <li>
                      <strong>用户管理</strong>
                      在集群中创建和管理Kafka用户。
                    </li>
                    <li>
                      <strong>连接器管理</strong>
                      创建和管理Kafka Connect连接器。
                    </li>
                    <li>
                      <strong>包括Kafka Mirror Maker 1和2</strong>
                      允许在不同的Apache Kafka 集群之间存储数据。
                    </li>
                    <li>
                      <strong>包括HTTP Kafka Bridge</strong>
                      允许客户端通过HTTP协议通过Apache Kafka
                      集群发送和接收消息。
                    </li>
                    <li>
                      <strong>集群重新平衡</strong>
                      使用内置的Cruise
                      Control，可以根据指定的目标重新分配分区副本，以实现最佳的集群性能。
                    </li>
                    <li>
                      <strong>监控</strong>
                      使用Prometheus和提供的Grafana dashabords进行监控的内置支持
                    </li>
                    <li>内置的Cruise Control支持集群重新分配</li>
                    <li>HTTP bridge 中的CORS支持</li>
                    <li>改进了TLS的可配置性</li>
                  </ul>
                  <h3 style="margin: 18px 0">部署架构</h3>
                  <p>
                    Kafka部署架构中一共包含了三个Operator：Cluster
                    Operator、User Operator和Topic
                    Operator。在用户提交了创建资源 (Kafka CR) 之后，Cluster
                    Operator会部署出一个Kafka集群和一个ZooKeeper集群。用户也可以通过创建User
                    CR和Topic CR来创建Kafka User和Kafka
                    Topic。部署架构图如下图所示。
                  </p>

                  <h3 style="margin: 18px 0">快速上手</h3>
                  <p>要快速启动并运行，请查看我们的快速入门指南</p>
                </div>
                <!-- 5 -->
                <div style="padding: 0 16px" v-if="titleName == 'Katanomi'">
                  <h2 style="margin-bottom: 16px">介绍</h2>
                  <p>
                    Katanomi 是平台自研的 DevOps 核心组件，实现了 DevOps
                    的主要核心功能，是使用基于 Tekton
                    实现的持续构建和持续发布功能的必装组件。
                  </p>
                  <p>
                    如需使用基于 Tekton 的核心功能，需要提前在业务集群中同时部署
                    Katanomi、Tekton、Knative 三个工具。
                  </p>
                  <ul style="margin-top: 0.25em; padding-left: 2em">
                    <li>
                      Katanomi：DevOps的核心组件，实现了工具链集成绑定、凭据管理、持续构建、持续发布等功能
                    </li>
                    <li>
                      Tekton：为持续构建和持续发布两个功能提供流水线的执行引擎
                    </li>
                    <li>
                      Knative：流水线的事件触发机制，如代码仓库触发器、镜像仓库触发器等
                    </li>
                  </ul>
                </div>
                <!-- 6 -->
                <div style="padding: 0 16px" v-if="titleName == 'Knative'">
                  <h2 style="margin-bottom: 16px">介绍</h2>
                  <p>
                    Knative 是开源的 serverless 架构方案，旨在提供一套简单易用的
                    serverless 方案，把 serverless 标准化。
                  </p>
                  <p>
                    Knative 系统包含三个模块，其中此 operator 工具仅引用了
                    Eventing 模块，用来实现 DevOps 流水线的事件触发机制。
                  </p>
                  <ul style="margin-top: 0.25em; padding-left: 2em">
                    <li>
                      Build：构建系统，把用户定义的函数和应用 build 成容器镜像
                    </li>
                    <li>
                      Serving：服务系统，用来配置应用的路由、升级策略、自动扩缩容等功能
                    </li>
                    <li>Eventing：事件系统，用来自动完成事件的绑定和触发</li>
                  </ul>
                </div>
                <!-- 7 -->
                <div
                  style="padding: 0 16px"
                  v-if="titleName == 'KubeVirt HyperConverged Cluster Operator'"
                >
                  <p>
                    <strong>HyperConverged Cluster Operator</strong> is an
                    Operator pattern for managing multi-oparetor products.
                    Specifcally, the HyperConverged Cluster Operator manages the
                    deployment of KubeVirt, Containerized Data Importer
                    (CDI),Virtual Machine import operator and Cluster Network
                    Addons (CNA) operators.
                  </p>

                  <p>
                    <strong>KubeVirt</strong> is a virtual machine management
                    add-on for Kubernetes. The aim is to provide a common ground
                    for virtualization solutions on top of Kubernetes.
                  </p>

                  <h1 style="margin-bottom: 16px">
                    {{ "Virtualization extension for Kubernetes" }}
                  </h1>
                  <p>
                    At its core, KubeVirt extends Kubernetes by adding
                    additional virtualization resource types (especially the
                    VirtualMachine type) through Kubernetes's Custom Resource
                    Definitions API. By using this mechanism, the Kubernetes API
                    can be used to manage these VirtualMachine resources
                    alongside all other resources Kubernetes provides.
                  </p>

                  <p>
                    The resources themselves are not enough to launch virtual
                    machines. For this to happen the
                    <em>functionality and business logic</em> needs to be added
                    to the cluster. The functionality is not added to Kubernetes
                    itself, but rather added to a Kubernetes cluster by
                    <em>running</em> additional controllers and agents on an
                    existing cluster.
                  </p>

                  <p>
                    The necessary controllers and agents are provided by
                    KubeVirt.
                  </p>

                  <p>As of today KubeVirt can be used to declaratively</p>

                  <ul style="margin-top: 0.25em; padding-left: 2em">
                    <li>Create a predefined VM</li>
                    <li>Schedule a VM on a Kubernetes cluster</li>
                    <li>Launch a VM</li>
                    <li>Migrate a VM</li>
                    <li>Stop a VM</li>
                    <li>Delete a VM</li>
                  </ul>

                  <h1 style="margin-bottom: 16px">
                    {{ "Start using KubeVirt" }}
                  </h1>
                  <ul style="margin-top: 0.25em; padding-left: 2em">
                    <li>Try our quickstart at kubernetes.io.</li>
                    <li>See our user documentation at kubevirt.io/docs.</li>
                  </ul>

                  <h1 style="margin-bottom: 16px">
                    {{ "Start developing KubeVirt" }}
                  </h1>
                  <p>
                    To set up a development environment please read our Getting
                    Started Guide. To learn how to contribute, please read our
                    contribution guide.
                  </p>
                  <p>
                    You can learn more about how KubeVirt is designed (and why
                    it is that way), and learn more about the major components
                    by taking a look at our developer documentation:
                  </p>

                  <ul style="margin-top: 0.25em; padding-left: 2em">
                    <li>Architecture - High-level view on the Architecture</li>
                    <li>Components - Detailed look at all components</li>
                    <li>API Reference</li>
                  </ul>

                  <h1 style="margin-bottom: 16px">
                    {{ "Community" }}
                  </h1>
                  <p>
                    If you got enough of code and want to speak to people, then
                    you got a couple of options:
                  </p>
                  <ul style="margin-top: 0.25em; padding-left: 2em">
                    <li>Follow us on Twitter</li>
                    <li>
                      Chat with us in the #virtualization channel of the
                      Kubernetes Slack
                    </li>
                    <li>Discuss with us on the kubevirt-dev Google Group</li>
                    <li>
                      Stay informed about designs and upcoming events by
                      watching our community content
                    </li>
                  </ul>

                  <h1 style="margin-bottom: 16px">
                    {{ "License" }}
                  </h1>
                  <p>
                    KubeVirt is distributed under the Apache License, Version
                    2.0.
                  </p>
                </div>
                <!-- 8 -->
                <div style="padding: 0 16px" v-if="titleName == 'MongoDB'">
                  <h1 style="margin-bottom: 16px">{{ "MongoDB" }}</h1>
                  <h3 style="margin-bottom: 16px">介绍</h3>
                  <p>
                    MongoDB 是一个基于分布式文件存储的数据库，旨在为 WEB
                    应用提供可扩展的高性能数据存储解决方案，具有高性能、可扩展、易部署、易使用等特性，存取数据非常方便
                  </p>
                  <p><strong>支持版本：MongoDB 4.2 & 4.4</strong></p>

                  <h3 style="margin-bottom: 16px">支持的功能</h3>
                  <ul style="margin-top: 0.25em; padding-left: 2em">
                    <li>
                      <strong>集群扩展</strong> - 通过改变 size
                      参数来增加和移除副本集成员，最小高可用副本集成员数量为3。
                    </li>
                    <li>
                      <strong>监控</strong> - 轻松部署 Percona
                      控制面板，以便于监控 MongoDB 副本集中各个节点状态。
                    </li>
                    <li>
                      <strong>自动备份</strong> -
                      配置自动备份，使其按计划运行或随时按需运行。备份是使用
                      Percona Backup for MongoDB (PBM)
                      执行的，可以存储在任何与S3兼容的云存储提供商中。
                    </li>
                  </ul>
                </div>

                <!-- 9 -->
                <div
                  style="padding: 0 16px"
                  v-if="titleName == 'MySQL Group Replication'"
                >
                  <h3>介绍</h3>
                  <p>
                    该 Operator 以 InnoDB 和组复制为基础，为运行在 Kubernetes
                    上的 MySQL 提供完整的高可用决解方案
                  </p>
                  <p>
                    <strong>版本支持：MySQL 8.0</strong>
                  </p>

                  <h3>支持功能</h3>
                  <ul style="margin-top: 0.25em; padding-left: 2em">
                    <li>支持单主和多主</li>
                    <li>内置监控</li>
                    <li>持久化存储</li>
                    <li>支持备份恢复</li>
                    <li>资源配置</li>
                    <li>密码设置</li>
                    <li>读写分离和路由</li>
                    <li>节点选择和亲和性</li>
                    <li>污点和容忍性设置</li>
                  </ul>
                </div>

                <!-- 10 -->
                <div
                  style="padding: 0 16px"
                  v-if="titleName == 'MySQL PXC Cluster'"
                >
                  <h1>MySQL</h1>
                  <h3>介绍</h3>
                  <p>
                    MySQL 是全球最受欢迎的关系型数据库之一，作为开源软件组合
                    LAMP (Linux + Apache + MySQL + Perl/PHP/Python)
                    中的重要一环，广泛应用于各类应用场景。MySQL Operator
                    提供了自动创建，更改，删除 Percona XtraDB
                    数据库集群节点的功能，通过这些功能可以方便的初始化新的数据库集群或扩展现有的数据库集群。MySQL
                    Operator 还包含了所有必要的 Kubernetes
                    配置来帮助你配置一个合适的Percona XtraDB 集群。
                  </p>
                  <p>
                    <strong>版本支持：5.7</strong>
                  </p>

                  <h3>支持功能</h3>
                  <ul style="margin-top: 0.25em; padding-left: 2em">
                    <li>
                      <strong>多主框架</strong>
                      真正的多点读写集群，在任何时候读取到最新数据。
                    </li>
                    <li>
                      <strong>同步复制</strong>
                      集群的不同节点之间数据同步，没有延迟；即使在数据库挂掉之后，不会丢失数据。
                    </li>
                    <li>
                      <strong>并发复制</strong>
                      从节点在应用数据时，支持并行执行，从而有更好的性能表现。
                    </li>
                    <li>
                      <strong>故障热切</strong>
                      在出现数据库故障时，因为支持多点写入，切换非常容易。
                    </li>
                    <li>
                      <strong>热插拔</strong>
                      在服务器间，如果数据库主节点挂了，只要监控程序发现的够快，不可服务时间就会变得非常少。在节点故障期间，节点本身对集群影响非常小。
                    </li>
                    <li>
                      <strong>自动节点克隆</strong>
                      在新增节点或者停机维护时，增量数据或者基础数据不需要和管理员手动备份；PXC会自动拉取在线节点数据，从而实现最终一致性。
                    </li>
                    <li>
                      <strong>集群扩展</strong>
                      可以通过修改 "size" 参数来增加或者移除集群成员
                    </li>
                    <li>
                      <strong>用户管理</strong>
                      增加、删除、修改用户权限
                    </li>
                  </ul>

                  <h3 style="margin-bottom: 16px">快速上手</h3>
                  <p>要快速启动并运行，请查看我们的快速入门指南</p>
                </div>

                <!-- 11 -->
                <div style="padding: 0 16px" v-if="titleName == 'PostgreSQL'">
                  <h1>PostgreSQL</h1>
                  <h3>介绍</h3>
                  <p>
                    经过30多年的积极开发严禁，PostgreSQL以可靠性、丰富功能和强大性能而著称，被业界誉为"最先进的开源关系型数据库"。
                    PostgreSQL支持大部分的SQL标准并且提供了很多其他现代特性，如复杂查询、外键、触发器、视图、事务完整性、多版本并发控制等。Postgres
                    Operator 提供了在 Kubernetes 上自动创建、更新和管理 Postgres
                    集群的功能。
                  </p>
                  <p>
                    <strong>版本支持：PostgreSQL 9.6、10、11、12</strong>
                  </p>

                  <h3>支持功能</h3>

                  <ul style="margin-top: 0.25em; padding-left: 2em">
                    <li>
                      <strong>免运维</strong>
                      通过 PostgreSQL 资源配置集群
                    </li>
                    <li>
                      <strong>可伸缩</strong>
                      通过 Patroni 实现 PostgreSQL 集群高可用
                    </li>
                    <li>
                      <strong>滚动更新</strong>
                      PostgreSQL 集群，包括：小版本更新
                    </li>
                    <li>使用 PG Bouncer 作为数据库连接池</li>
                    <li>还原和克隆 PostgreSQL 集群 (包括大版本升级)</li>
                    <li>可以配置 S3 bucket 的逻辑备份</li>
                    <li>使用 S3 WAL 备份集群</li>
                    <li>可为非云环境配置</li>
                    <li>K8s 上的基本凭证和用户管理，简化了应用程序部署</li>
                    <li>用于创建和编辑 PostgreSQL 集群的 UI</li>
                  </ul>

                  <h3 style="margin-bottom: 16px">部署架构</h3>
                  <p>下图展示了一个新的PostgreSQL集群会创建的各种资源种类</p>

                  <h3 style="margin-bottom: 16px">快速上手</h3>
                  <p>要快速启动并运行，请查看我们的快速入门指南</p>
                </div>

                <!-- 12 -->
                <div
                  style="padding: 0 16px"
                  v-if="titleName == 'Prometheus Operator'"
                >
                  <p>
                    基于Kubernetes的Prometheus
                    Operator提供了一个简单易用的对Kubernetes服务的监控定义方式，和对Prometheus和Alertmanager实例的部署和管理方式。
                  </p>

                  <p>部署以后，Prometheus Operator可以提供一些特性</p>

                  <ul style="margin-top: 0.25em; padding-left: 2em">
                    <li>
                      <strong>创建/销毁</strong>
                      你可以用Prometheus
                      Operator简单地在你的Kubernetes命名空间启动一个Prometheus
                    </li>
                    <li>
                      <strong>简易配置</strong>
                      你可以基于Prometheus等自定义资源，简单地配置Prometheus的基础配置，比如版本、持久存储、保留策略、福本数等等。
                    </li>
                    <li>
                      <strong>基于labels获取服务目标</strong>
                      基于与Kubernetes类似的label查询，自动生成监控目标配置；不需要学习Prometheus
                      指定的的配置语法。
                    </li>
                  </ul>

                  <h3 style="margin-bottom: 16px">其他特性</h3>
                  <p><strong>高可用</strong></p>
                  <p>
                    可以在失败域间运行多个实例。数据会被备份。这会让你的监控服务在电力断供期间保持可用状态，这个时候你可能
                    最需要它。
                  </p>
                  <p><strong>滚动升级</strong></p>
                  <p>
                    无服务间断地滚动升级Prometheus到新的版本，很方便地保持更新。
                  </p>
                  <p><strong>处理容器地动态特性</strong></p>
                  <p>
                    告警规则可以附加到一组容器而不是单个单例，对于容器部署的高度动态特性，这种事最理想的。
                  </p>
                </div>

                <!-- 13 -->
                <div style="padding: 0 16px" v-if="titleName == 'RabbitMQ'">
                  <h1>RabbitMQ</h1>
                  <h3 style="margin-bottom: 16px">介绍</h3>
                  <p>
                    RabbitMQ是实现了高级消息队列协议 (AMQP) 的开源消息代理软件
                    (亦称面向消息的中间件)。RabbitMQ
                    有成千上万的用户，是最受欢迎的开源消息代理之一。从 T-Mobile
                    到 Runtastic，RabbitMQ
                    在全球范围内的小型初创企业和大型企业中都得到使用。
                  </p>

                  <p>
                    <strong>支持版本：3.8.16 3.8.12 3.8.11</strong>
                  </p>

                  <h3 style="margin-bottom: 16px">支持的功能</h3>
                  <ul style="margin-top: 0.25em; padding-left: 2em">
                    <li>
                      <strong>可靠性</strong>
                      RabbitMQ
                      使用一些机制来确保可靠性，如持久化、传输确认及发布确认等。
                    </li>
                    <li>
                      <strong>灵活的路由</strong>
                      在消息进入队列之前，通过交换器来路由消息。对于典型的路由功能，RabbitMQ
                      已经提供了一些内置的交换器来实现。针对更复杂的路由功能，可以将多个交换器绑定在一起，也可以通过插件机制来实现自己的交换器。
                    </li>
                    <li>
                      <strong>扩展性</strong>
                      多个 RabbitMQ
                      节点可以组成一个集群，也可以根据实际业务情况动态地扩展集群中节点。
                    </li>
                    <li>
                      <strong>高可用性</strong>
                      队列可以在集群中地机器上设置镜像，使得在部分节点出现问题的情况下队列仍然使用。
                    </li>
                  </ul>

                  <h3 style="margin-bottom: 16px">快速上手</h3>
                  <p>要快速启动并运行，请查看我们的快速入门指南。</p>
                </div>

                <!-- 14 -->
                <div style="padding: 0 16px" v-if="titleName == 'Redis'">
                  <h2 style="margin-bottom: 16px">介绍</h2>
                  <p>
                    Redis (Remote Dictionary Server)，即远程字典服务，是一个使用
                    ANSI C
                    编写的开源、支持网络、基于内存、可选持久性的键值对存储数据库，并提供多种语言的
                    API。Redis Operator 是一款基于 Kubernetes，创建、配置并管理
                    Redis 实例的 Redis Operator，支持集群、哨兵两种部署架构。
                  </p>

                  <p>
                    <strong>支持版本：Redis 4.0、5.0、6.0</strong>
                  </p>

                  <h2 style="margin-bottom: 16px">支持的功能</h2>
                  <ul style="margin-top: 0.25em; padding-left: 2em">
                    <li>支持集群、哨兵两种部署架构</li>
                    <li>内置监控</li>
                    <li>PVC 动态存储</li>
                    <li>支持备份恢复</li>
                    <li>资源配额</li>
                    <li>密码和无密码设置</li>
                    <li>节点选择和亲和性</li>
                    <li>优先类和管理部署优先级</li>
                    <li>SecurityContext 支持</li>
                  </ul>

                  <h2 style="margin-bottom: 16px">部署架构</h2>
                  <p>下图展示了 Redis 的部署架构图</p>

                  <h2 style="margin-bottom: 16px">快速上手</h2>
                  <p class="cursor-pointer">
                    要快速并运行，请查看我们的 快速入门指南
                  </p>
                </div>

                <!-- 15 -->
                <div style="padding: 0 16px" v-if="titleName == 'Rook-Ceph'">
                  <h2 style="margin-bottom: 16px">介绍</h2>
                  <p>
                    Rook-Ceph operator 可以用于打包、部署、管理、升级和扩展 Ceph
                    存储，为基础设置服务(Logging、Metrics、Registry)以及
                    Kubernetes 集群中的有状态应用程序提供持久存储。
                  </p>

                  <h2 style="margin-bottom: 16px">Rook-Ceph Operator</h2>

                  <p>
                    Rook-Ceph 是一个云原生的存储服务，便于与 Kubernetes
                    集群中需要持久化存储的应用程序进行最佳集成，并在后台处理诸如供应和管理等繁重工作。
                  </p>

                  <p>
                    Ceph
                    是一个可大规模扩展的、软件定义的云本地存储平台，提供块、文件和对象存储服务。
                    Ceph 可用于支持各种应用程序，包括关系数据库、NoSQL
                    数据库、CI/CD 工具集、消息传递、AI/ML 和分析应用程序。 Ceph
                    是一个经过验证的存储平台，支持世界上一些最大的存储部署，并拥有一个大型的、充满活力的开源社区支持该项目。
                  </p>

                  <h2 style="margin-bottom: 16px">支持功能</h2>

                  <ul style="margin-top: 0.25em; padding-left: 2em">
                    <li>
                      <strong>高可用性和弹性</strong> - Ceph
                      没有单点故障(SPOF)，所有组件以高可用的方式本地工作
                    </li>
                    <li>
                      <strong>数据冗余</strong> - Ceph
                      可以通过多副本的方式来提供数据冗余
                    </li>
                    <li>
                      <strong>数据保护</strong> - Ceph
                      定期清理不一致的对象，并在必要时修复它们，确保您的副本总是一致的
                    </li>
                    <li>
                      <strong>块、文件和对象存储服务</strong> - Ceph
                      同时支持文件、块和对象存储，能够解决所有应用程序的存储需求
                    </li>
                  </ul>

                  <h2 style="margin-bottom: 16px">快速上手</h2>
                  <p class="cursor-pointer">
                    {{ "https://rook.io/docs/rook/v1.5/ceph-quickstart.html" }}
                  </p>
                </div>

                <!-- 16 -->
                <div style="padding: 0 16px" v-if="titleName == 'Tekton'">
                  <h2 style="margin-bottom: 16px">介绍</h2>
                  <p>
                    Tekton 是一个功能非常强大而灵活的 CI/CD 开源的云原生框架。
                  </p>

                  <p>
                    Tekton 的前身是 Knative 项目的 build-pipeline
                    项目，这个项目是为了给 build 模块增加 pipeline
                    的功能，但是随着不同功能加入到 Knative build 模块中，build
                    模块越来越变得像一个通用的 CI/CD 系统，于是，build-pipeline
                    被剥离除了 Knative，就变成了现在的 Tekton，而 Tekton
                    也从此变成了功能全面、标准化的云原生 CI/CD 解决方案。
                  </p>
                  <h2 style="margin-bottom: 16px">Tekton 的特点</h2>
                  <ul style="margin-top: 0.25em; padding-left: 2em">
                    <li>
                      可定制：Tekton
                      是完全可定制的，具有高度的灵活性，用户可以定义非常详细的构建快目录，在各种场景中使用
                    </li>
                    <li>
                      可重复使用：Tekton
                      是完全可移植的，用户都可以使用给定的流水线并重用其构建块，可以使得开发人员无需"造轮子"就可以快速构建复杂得流水线
                    </li>
                    <li>
                      可扩展：Tekton Catalog 是社区驱动得 Tekton
                      构建块存储库，用户可以使用 Tekton Catalog
                      中定义的组件快速创建新的流水线并扩展现有管道
                    </li>
                    <li>
                      标准化：Tekton 在 Kubernetes
                      集群上作为扩展安装和运行，并使用完善的 Kubernetes
                      资源模型，Tekton 工作负载在 Kubernetes Pod 内执行
                    </li>
                    <li>
                      伸缩性：要增加工作负载容量，只需添加新的节点到集群即可，Tekton
                      可随集群扩展，无需重新定义资源分配或对管道进行任何其他修改
                    </li>
                  </ul>
                </div>
              </section>
            </el-tab-pane>

            <el-tab-pane label="自定义资源" name="2">
              <section class="component-div">
                <div class="row-bg">
                  <div
                    class="item"
                    v-for="item in appTempData"
                    :key="item.label"
                  >
                    <div class="buttonClass">
                      <div class="noteStyle_2">KafkaBridge</div>
                      <div class="noteStyle_3">KafkaBridge集群</div>
                      <div class="cursor-pointer" style="font-size: 14px">
                        <i class="el-icon-document" @click="handleView">
                          查看样例 YAML
                        </i>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            </el-tab-pane>
          </el-tabs>
        </BaseCard>
      </el-col>
    </el-row>

    <monaco-editor-dialog
      v-if="detailVisible"
      id="eventMonacoEditorDialog"
      :title="title"
      :visible="detailVisible"
      :code="code"
      :read-only="readOnly"
      :btn-visible="btnVisible"
      :language="language"
      :submit-txt="submitTxt"
      @closeDetailsDialog="closeDetailsDialog"
    />

    <el-dialog
      title="部署 Operator"
      @close="deployVisible = false"
      :visible.sync="deployVisible"
      width="70%"
      :append-to-body="true"
    >
      <el-form
        ref="deployForm"
        :model="deployForm"
        :rules="deployRules"
        label-width="135px"
      >
        <el-form-item label="Operator">
          <span>{{ "xxx-xxx-xxx-operator" }}</span>
        </el-form-item>

        <el-form-item label="升级策略">
          <el-radio-group v-model="deployForm.policy">
            <el-radio-button label="手动">手动</el-radio-button>
            <el-radio-button label="自动">自动</el-radio-button>
          </el-radio-group>
        </el-form-item>
        <el-descriptions size="small" :colon="false" :contentStyle="rowCenter">
          <el-descriptions-item>
            同一命名空间下仅支持单一升级策略。更改升级策略后，该命名空间所有已安装
            operator 的升级策略将同步修改
          </el-descriptions-item>
        </el-descriptions>

        <el-form-item label="频道" prop="channel">
          <el-select
            v-model="deployForm.channel"
            @focus="setMinWidthEmpty"
            style="width: 80%"
          >
            <el-option
              v-for="item in [{ value: 'alpha', label: 'alpha' }]"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>

        <el-form-item label="集群">
          <span>{{ "global" }}</span>
        </el-form-item>

        <el-form-item label="安装模式">
          <el-radio-group v-model="deployForm.installMode">
            <el-radio-button label="集群模式">集群模式</el-radio-button>
            <el-radio-button label="命名空间模式">命名空间模式</el-radio-button>
          </el-radio-group>
        </el-form-item>

        <el-form-item
          label="命名空间"
          v-if="deployForm.installMode == '命名空间模式'"
          prop="namespace"
        >
          <el-select
            v-model="deployForm.namespace"
            @focus="setMinWidthEmpty"
            style="width: 80%"
          >
            <el-option
              v-for="item in namespaceOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="handle_deploy">部署</el-button>
        <el-button @click="deployVisible = false"> 取消 </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import LineAlert from "@/apps/container/views/components/LineAlert";
import MonacoEditorDialog from "@/apps/container/views/components/MonacoEditorDialog.vue";
import { nanoid } from "nanoid";

export default {
  name: "BaseInfo",
  components: { LineAlert, MonacoEditorDialog },
  props: {},
  data() {
    return {
      syncRes: "el-icon-remove",
      syncDisable: true,
      name: "",
      activeName: "1",
      typeValue: "",
      typeValue2: "",

      titleName: "",

      // 事件详情数据
      detailVisible: false,
      readOnly: true,
      title: "",
      code: "",
      language: "json",
      submitTxt: null,
      btnVisible: {
        autoUpdate: false,
        import: false,
        export: true,
        reset: false,
        find: true,
        copy: true,
      },
      spec: {
        detail: {
          cluster_name: "global",
          event: {
            count: 6713,
            eventTime: null,
            firstTimestamp: "2022-10-14T05:33:11Z",
            involvedObject: {
              apiVersion: "v1",
              fieldPath: "spec.containers{ubuntu}",
              kind: "Pod",
              name: "ubuntu-bq84l",
              namespace: "toda-elasticsearch-system",
              resourceVersion: "519516627",
              uid: "441f41bd-77d5-4f1d-90c4-2b0aee37e7e0",
            },
            lastTimestamp: "2022-11-07T01:33:22Z",
            message:
              'Container image "index.docker.io/library/ubuntu:latest" already present on machine',
            metadata: {
              creationTimestamp: "2022-11-07T01:18:15Z",
              name: "ubuntu-bq84l.171dd899b971f3ab",
              namespace: "toda-elasticsearch-system",
              resourceVersion: "603142979",
              uid: "c61582db-0ce2-469d-8606-9854962ffc82",
            },
            reason: "Pulled",
            reportingComponent: "",
            reportingInstance: "",
            source: {
              component: "kubelet",
              host: "172.16.129.51",
            },
            type: "Normal",
          },
          operation: "Pulled",
          operator: "kubelet@172.16.129.51",
          source: "kubernetes",
        },
        log_level: 0,
        resource_id: "441f41bd-77d5-4f1d-90c4-2b0aee37e7e0",
        resource_type: "Pod",
        time: "1667783895000000",
      },

      rowCenter: {
        "max-width": "700px",
        "word-break": "break-all",
        display: "table-cell",
        "vertical-align": "middle",
        "margin-left": "123px",
        "margin-top": "-20px",
        color: "#A9A9A9",
      },

      appTempData: [
        {
          label: "chartmuseum",
          desc: "Host your own Helm Chart Repository",
          version: [
            {
              vers: "2.15.0",
              status: "已就绪",
              maintainer: "",
              time: "2022-10-24",
              isLatest: true,
            },
          ],
        },
        {
          label: "docker-registry",
          desc: "A Helm chart for Docker Registry",
          version: [
            {
              vers: "v3.2.0",
              status: "已就绪",
              maintainer: "",
              time: "2022-10-24",
              isLatest: true,
            },
          ],
        },
        {
          label: "elasticsearch",
          desc: "Elastic helm chart for Elasticsearch",
          version: [
            {
              vers: "7.8.1",
              status: "已就绪",
              maintainer: "",
              time: "2022-10-24",
              isLatest: true,
            },
            {
              vers: "7.8.0",
              status: "已就绪",
              maintainer: "",
              time: "2022-10-24",
              isLatest: false,
            },
          ],
        },
        {
          label: "femas",
          desc: "A Helm chart fro Femas",
          version: [
            {
              vers: "v2.0.0",
              status: "已就绪",
              maintainer: "",
              time: "2022-10-24",
              isLatest: true,
            },
          ],
        },
        {
          label: "pmem-redis",
          desc: "Chart for PMEM Redis",
          version: [
            {
              vers: "v3.0.0",
              status: "已就绪",
              maintainer: "",
              time: "2022-10-24",
              isLatest: true,
            },
          ],
        },
        {
          label: "zookeeper",
          desc: "Zookeeper是一个分布式的应用程序协调服务，可以为分布式程序提供的功能包括：配置维护、域名服务、分布式同步、组服务等",
          version: [
            {
              vers: "v3.0.0",
              status: "已就绪",
              maintainer: "",
              time: "2022-10-24",
              isLatest: true,
            },
          ],
        },
      ],

      dataForm: {
        type: "用户名/密码",
        name: "",
        password: "",
      },
      dataRules: {
        name: [{ required: true, message: "必填项不能为空", trigger: "blur" }],
        password: [
          { required: true, message: "必填项不能为空", trigger: "blur" },
        ],
      },
      infoForm: {
        secretName: "",
        showName: "",
        toolType: "",
      },
      infoRules: {
        secretName: [
          { required: true, message: "必填项不能为空", trigger: "blur" },
        ],
      },

      baseInfoData: [
        {
          label: "软件版本",
          value: "3.8.11",
        },
        {
          label: "供应商",
          value: "平台",
        },
        {
          label: "分类目录",
          value: "无",
        },
        {
          label: "供应商类型",
          value: "平台认证",
        },
        {
          label: "能力等级",
          value: "基本安装",
        },
        {
          label: "创建时间",
          value: "2023-05-16 08:56:59",
        },
        {
          label: "硬件架构",
          value: "ARM，x86",
        },
      ],

      deployVisible: false,

      deployRules: {
        channel: [
          { required: true, message: "必填项不能为空", trigger: "change" },
        ],
        namespace: [
          { required: true, message: "必填项不能为空", trigger: "change" },
        ],
      },
      deployForm: {
        policy: "自动",
        channel: "alpha",
        installMode: "集群模式",
        namespace: "",
      },

      namespaceOptions: [
        { value: "noUnder", label: "-(不在命名空间下)" },
        { value: "baas", label: "baas" },
        { value: "cart-manager", label: "cart-manager" },
        { value: "chaos", label: "chaos" },
        { value: "cpass-dev", label: "cpass-dev" },
        { value: "cpass-system", label: "cpass-system" },
      ],
    };
  },
  computed: {},
  watch: {},
  created() {
    this.titleName = this.$route.query.name;
  },
  mounted() {},
  beforeRouteEnter(to, from, next) {
    document.body.scrollTop = 0;
    // firefox
    // document.documentElement.scrollTop = 0;
    next();
  },
  methods: {
    getList() {},

    setMinWidthEmpty(val) {
      // 无数据的情况下，给请选择提示设置最小宽度
      let domEmpty = document.getElementsByClassName(
        "el-select-dropdown__empty"
      );
      if (domEmpty.length > 0) {
        domEmpty[0].style["min-width"] = val.srcElement.clientWidth + 2 + "px";
      }
    },

    handleView(obj) {
      this.detailVisible = true;
      this.readOnly = true;
      this.submitTxt = null;
      this.title = "KafkaBridge";
      this.code = JSON.stringify(this.spec, null, 2);
    },

    closeDetailsDialog() {
      this.detailVisible = false;
    },

    handleDeploy() {
      this.deployForm = this.$options.data().deployForm;
      this.deployVisible = true;
    },

    handle_deploy() {},

    handleToPlatform() {
      console.log("跳转到平台");
    },
  },
};
</script>
<style lang="scss" scoped>
.create-container {
  padding: 0 20px;
  background-color: $background-color;
  min-height: 100%;
  position: relative;
  .scroll-div {
    padding-bottom: 106px;
    .el-tooltip {
      margin-left: 5px;
    }
    .hover-div:hover {
      background: $color-primary-rgba1;
    }
    .no-data {
      text-align: center;
      color: darkgray;
    }
  }
  .yaml-div {
    margin: 20px 0 20px 0;
    padding: 20px;
    background: #fff;
    border-radius: $border-radius-m;
    box-shadow: 0 0 4px 0 $box-shadow;
    .tips-div {
      display: flex;
      align-items: center;
      justify-content: flex-start;
      margin-top: 20px;
      font-size: $font-size-14;
      p {
        color: $color-primary;
        display: flex;
        align-items: center;
        margin-right: 10px;
        i {
          font-size: $font-size-20;
          color: $color-primary;
          margin-right: 2px;
        }
      }
      p:first-child {
        margin-left: 10px;
      }
      span:hover {
        text-decoration: underline;
      }
    }
  }
  .fixed-div {
    width: calc(100% - 250px);
    // width: calc(100% - 250px);
    padding: 20px;
    box-sizing: border-box;
    position: fixed;
    bottom: 0;
    right: 20px;
    background: #fff;
    text-align: right;
    border-radius: $border-radius-m;
    box-shadow: 0 0 4px 0 $box-shadow;
  }
  .el-row {
    margin-bottom: 20px;
    margin-left: 15px;
    &:last-child {
      margin-bottom: 0;
    }
  }
  .create-container .el-row[data-v-0337e0e9] {
    margin-bottom: -20px;
  }
  .grid-content {
    border-radius: 4px;
    min-height: 50px;
  }
  .bg-purple {
    background: #fff;
    padding: 10px;
    margin: 10px;
  }
  .el-dialog-div {
    height: 65vh;
    overflow: auto;
  }
}
.label-value {
  margin-bottom: 12px;
  span {
    font-size: $font-size-14;
    font-weight: 500;
  }
  span:last-child {
    font-weight: 400;
  }
  i {
    color: $color-primary;
    margin-left: 10px;
    cursor: pointer;
  }
}
.card-title[data-v-8638ebe6] {
  font-size: 25px;
  line-height: 45px;
  font-weight: bold;
}
.status-point {
  display: inline-block;
  width: 8px;
  height: 8px;
  border-radius: 50%;
}
.create-container .el-dialog-div {
  height: 15vh;
  overflow: auto;
}
.ellipsis {
  max-width: 100px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  display: inline-block;
}
.contentStyle {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 120px;
  color: rgba(150, 152, 155);
}
.recomend-list h2 {
  position: relative;
  font-size: 18px;
  text-align: left;
  padding-left: 11px;
  height: 40px;
  line-height: 42px;
}
.recomend-list h2:before {
  position: absolute;
  content: "";
  background-color: #409eff;
  width: 4px;
  height: 18px;
  left: 0;
  top: 50%;
  margin-top: -8px;
  -webkit-border-radius: 3px;
  -moz-border-radius: 3px;
  border-radius: 3px;
}
li {
  line-height: 2em;
}
.row-bg {
  padding: 20px 20px;
  background-color: #f9fafc;
  margin-top: 20px;

  display: grid;
  grid-template-columns: repeat(3, calc(33.33% - 13px));
  grid-gap: 20px;
}
.buttonClass {
  width: 300px;
  height: 200px;
  padding: 20px;
  border: 1px solid rgba(150, 152, 155);
  border-radius: 2px;
  background: white;
  position: relative;
  // cursor: pointer;
}
/*鼠标悬浮，没有按下；鼠标按下后抬起，没有移开*/
.buttonClass:focus,
.buttonClass:hover {
  // background: #eaf5ff;
  border: 1px solid #2794f8 !important;
  // color: #2794f8;
}
.wordStyle {
  width: 260px;
  height: 29px;
  text-align: center;
  font-size: 18px;
  margin: 10px 0;
  text-overflow: -o-ellipsis-lastline;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}
.noteStyle {
  font-size: 14px;
  line-height: 20px;
  color: rgba(100, 102, 105);
}
.noteStyle_2 {
  font-size: 18px;
  height: 24px;
  line-height: 24px;
  margin-bottom: 16px;
}
.noteStyle_3 {
  font-size: 14px;
  height: 85px;
  line-height: 20px;
  margin-bottom: 16px;
  color: rgba(100, 102, 105);
}
</style>