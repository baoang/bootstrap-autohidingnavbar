# Bootstrap Auto-Hiding Navbar

[**English**](#english) · [**中文**](#chinese)

---

<a name="english"></a>

**An extension for Bootstrap's fixed navbar** — hides on scroll down, shows on scroll up. [Demo](http://www.virtuosoft.eu/code/bootstrap-autohidingnavbar/)

### Usage

```html
<script src="dist/jquery.bootstrap-autohidingnavbar.min.js"></script>
<script>
  $(".navbar-fixed-top").autoHidingNavbar();
</script>
```

### Options

| Option | Default | Description |
|--------|---------|-------------|
| `disableAutohide` | `false` | Set `true` to control navbar manually via `show()`/`hide()` |
| `showOnUpscroll` | `true` | Show navbar when scrolling upward |
| `showOnBottom` | `true` | Show navbar at page bottom |
| `hideOffset` | `'auto'` | Pixels to scroll before hiding (`'auto'` = navbar height) |
| `animationDuration` | `200` | Animation duration in ms |

### Methods

```javascript
$(selector).autoHidingNavbar('methodName', value);
```

- `setDisableAutohide(v)`, `setShowOnUpscroll(v)`, `setShowOnBottom(v)`,
  `setHideOffset(v)`, `setAnimationDuration(v)`
- `show()`, `hide()` — programmatic control
- `destroy()` — teardown

### License

Apache 2.0 — see [LICENSE.md](LICENSE.md)

---

<a name="chinese"></a>

**Bootstrap 固定导航栏增强插件** —— 页面向下滚动时隐藏，向上滚动时显示。[在线演示](http://www.virtuosoft.eu/code/bootstrap-autohidingnavbar/)

### 使用

```html
<script src="dist/jquery.bootstrap-autohidingnavbar.min.js"></script>
<script>
  $(".navbar-fixed-top").autoHidingNavbar();
</script>
```

### 选项

| 参数 | 默认值 | 说明 |
|------|--------|------|
| `disableAutohide` | `false` | `true` 时通过 `show()`/`hide()` 手动控制 |
| `showOnUpscroll` | `true` | 向上滚动时显示导航栏 |
| `showOnBottom` | `true` | 滚动到底部时显示 |
| `hideOffset` | `'auto'` | 滚动多少像素后隐藏（`'auto'` = 导航栏高度） |
| `animationDuration` | `200` | 动画时长（毫秒） |

### 方法

- `setDisableAutohide(v)`、`setShowOnUpscroll(v)` 等参数设置
- `show()` / `hide()` 手动控制
- `destroy()` 销毁实例

### 许可

Apache 2.0 — 详见 [LICENSE.md](LICENSE.md)
