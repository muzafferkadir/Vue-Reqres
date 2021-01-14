<template>
<div>
    <div class="container">
    <div class="interior">
        <a href="#open-modal">OPEN POPUP</a>
    </div>
    </div>
    <div id="open-modal" class="modal-window">
        <div>
            <a href="#" title="Close" class="modal-close">Close</a>
            <slot></slot>
        </div>
    </div>
</div>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
.modal-window {
  position: fixed;
  background-color: rgba(255, 255, 255, 0.25);
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 999;
  visibility: hidden;
  opacity: 0;
  pointer-events: none;
  transition: all 0.3s;
  &:target {
    visibility: visible;
    opacity: 1;
    pointer-events: auto;
  }
  &>div {
    width: 400px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    padding: 2em;
    background: #fff;
    border-width: 1px;
    border-radius: 4px;
	box-shadow:
		0 7px 14px 20px rgba(0, 0, 0, 0.08),
		0 6px 12px 0 rgba(0, 0, 0, 0.12);
  }
  header {
    font-weight: bold;
  }
  h1 {
    font-size: 150%;
    margin: 0 0 15px;
  }
}

.modal-close {
  color: #aaa;
  line-height: 50px;
  font-size: 80%;
  position: absolute;
  right: 0;
  text-align: center;
  top: 0;
  width: 70px;
  text-decoration: none;
  &:hover {
    color: black;
  }
}

</style>