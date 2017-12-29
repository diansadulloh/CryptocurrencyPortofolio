<template>
  <div class="sidebar">
    <SidebarHeader/>
    <SidebarForm/>
    <nav class="sidebar-nav">
      <div slot="header"/>
      <ul class="nav">
        <template v-for="item in navItems">
          <template v-if="item.title">
            <SidebarNavTitle
              :key="`item-${item.name}`"
              :name="item.name"
              :classes="item.class"
              :wrapper="item.wrapper"/>
          </template>
          <template v-else-if="item.divider">
            <SidebarNavDivider
              :key="`item-${item.name}`"
              :classes="item.class"/>
          </template>
          <template v-else>
            <template v-if="item.children">
              <!-- First level dropdown -->
              <SidebarNavDropdown
                :key="`item-${item.name}`"
                :name="item.name"
                :url="item.url"
                :icon="item.icon">
                <template v-for="childL1 in item.children">
                  <template v-if="childL1.children">
                    <!-- Second level dropdown -->
                    <SidebarNavDropdown
                      :key="`item-${item.name}-${childL1.name}`"
                      :name="childL1.name"
                      :url="childL1.url"
                      :icon="childL1.icon">
                      <li
                        class="nav-item"
                        :key="`item-${item.name}-${childL1.name}-${childL2.name}`"
                        v-for="childL2 in childL1.children">
                        <SidebarNavLink
                          :name="childL2.name"
                          :url="childL2.url"
                          :icon="childL2.icon"
                          :badge="childL2.badge"
                          :variant="item.variant"
                        />
                      </li>
                    </SidebarNavDropdown>
                  </template>
                  <template v-else>
                    <SidebarNavItem
                      :classes="item.class"
                      :key="`item-${item.name}-${childL1.name}`">
                      <SidebarNavLink

                        :name="childL1.name"
                        :url="childL1.url"
                        :icon="childL1.icon"
                        :badge="childL1.badge"
                        :variant="item.variant"
                      />
                    </SidebarNavItem>
                  </template>
                </template>
              </SidebarNavDropdown>
            </template>
            <template v-else>
              <SidebarNavItem
                :classes="item.class"
                :key="`item-${item.name}`">
                <SidebarNavLink

                  :name="item.name"
                  :url="item.url"
                  :icon="item.icon"
                  :badge="item.badge"
                  :variant="item.variant"/>
              </SidebarNavItem>
            </template>
          </template>
        </template>
      </ul>
      <slot/>
    </nav>
    <SidebarFooter/>
    <SidebarMinimizer/>
  </div>
</template>
<script>
import SidebarFooter from './SidebarFooter';
import SidebarForm from './SidebarForm';
import SidebarHeader from './SidebarHeader';
import SidebarMinimizer from './SidebarMinimizer';
import SidebarNavDivider from './SidebarNavDivider';
import SidebarNavDropdown from './SidebarNavDropdown';
import SidebarNavLink from './SidebarNavLink';
import SidebarNavTitle from './SidebarNavTitle';
import SidebarNavItem from './SidebarNavItem';

export default {
  name: 'Sidebar',
  components: {
    SidebarFooter,
    SidebarForm,
    SidebarHeader,
    SidebarMinimizer,
    SidebarNavDivider,
    SidebarNavDropdown,
    SidebarNavLink,
    SidebarNavTitle,
    SidebarNavItem
  },
  props: {
    navItems: {
      type: Array,
      required: true,
      default: () => { return []; }
    }
  },
  methods: {
    handleClick(e) {
      e.preventDefault();
      e.target.parentElement.classList.toggle('open');
    }
  }
};
</script>

<style lang="css">
  .nav-link {
    cursor: pointer;
  }
</style>
