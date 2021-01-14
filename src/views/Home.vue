<template>
  <div class="container">
    <div class="Card">
      <div class="Card__content Card__content--border">
        <button class="Button">
          <svg aria-hidden="true" height="12" width="12" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
            <path d="M9 7h6a1 1 0 0 1 0 2H9v6a1 1 0 0 1-2 0V9H1a1 1 0 1 1 0-2h6V1a1 1 0 1 1 2 0z" fill-rule="evenodd"></path>
          </svg>
          <span>New</span>
        </button>
      </div>
      <table class="Table">
        <thead>
          <tr>
          
            <td>ID</td>
            <td>EMAIL</td>
            <td>FIRST NAME</td>
            <td>LAST NAME</td>
            <td>ACTIONS</td>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td> 23 </td>
            <td>muzafferkadiryilmaz@gmail.com</td>
            <td>Muzaffer Kadir</td>
            <td>YILMAZ</td>
            <td>OPEN EDIT</td>
          </tr>
        </tbody>
      </table>
      <div class="Card__content">
        <div class="Card__content-text"><strong>1</strong> result(s)</div>
        <button class="Button ml-auto" >
          <span>Previous</span>
        </button>
        <button class="Button ml-2" >
          <span>Next</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Home'
}
</script>
<style lang="scss" scoped>
body {
	background: #e3e8ee;
	color: #3c4257;
	font-weight: 400;
	font-size: 14px;
}
strong, b {
	font-weight: 500;
}

@mixin actions {
  box-shadow: 
		rgba(0, 0, 0, 0) 0px 0px 0px 0px,
		rgba(0, 0, 0, 0) 0px 0px 0px 0px,
		rgba(0, 0, 0, 0.12) 0px 1px 1px 0px,
		rgba(60, 66, 87, 0.16) 0px 0px 0px 1px,
		rgba(0, 0, 0, 0) 0px 0px 0px 0px,
		rgba(0, 0, 0, 0) 0px 0px 0px 0px,
		rgba(60, 66, 87, 0.08) 0px 2px 5px 0px;
	
	&[disabled] {
		opacity: .5;
	}
	&:not([disabled]) {
		&:hover {
			color: rgb(26, 31, 54);
			box-shadow: 
				rgba(0, 0, 0, 0) 0px 0px 0px 0px,
				rgba(0, 0, 0, 0) 0px 0px 0px 0px,
				rgba(0, 0, 0, .12) 0px 1px 1px 0px,
				rgba(60, 66, 87, .16) 0px 0px 0px 1px,
				rgba(0, 0, 0, 0) 0px 0px 0px 0px,
				rgba(60, 66, 87, .08) 0px 3px 9px 0px,
				rgba(60, 66, 87, .08) 0px 2px 5px 0px;

			svg {
				fill: #2a2f45;
			}
		}
		&:focus {
			outline: none;
			box-shadow: 
				rgba(0, 0, 0, 0) 0px 0px 0px 0px,
				rgba(58, 151, 212, .36) 0px 0px 0px 4px,
				rgba(0, 0, 0, 0.12) 0px 1px 1px 0px,
				rgba(60, 66, 87, 0.16) 0px 0px 0px 1px,
				rgba(0, 0, 0, 0) 0px 0px 0px 0px,
				rgba(0, 0, 0, 0) 0px 0px 0px 0px,
				rgba(60, 66, 87, 0.08) 0px 2px 5px 0px;
		}
	}
}

.Button {
	@include actions();
	outline: none !important;
	font-weight: 500;
	background-color: #fff;
	border: 0;
	height: 28px;
	display: flex;
	align-items: center;
	padding: 4px 8px;
	border-radius: 4px;
	transition:
		background-color .24s,
		box-shadow .24s,
		color .24s;
	color: #3c4257;
	margin-right: .5rem;
	span {
		line-height: 20px;
	}
	svg {
		margin-right: 8px;
		fill: #4f566b;
	}
}
.Card {
	border-radius: 4px;
	background: #fff;
	overflow: hidden;
	box-shadow:
		0 7px 14px 0 rgba(60, 66, 87, 0.08),
		0 3px 6px 0 rgba(0, 0, 0, 0.12);

	&__content {
		padding: 20px;
		display: flex;
		align-items: center;
		&-text{
      margin-right: 1rem;
    }
		&--border {
			box-shadow: inset 0 -1px #e3e8ee;
		}
	}
}
.Table {
	width: 100%;
	
	tbody {
		td {
			font-size: 14px;
			color: #3c4257;
			font-weight: 400;
			line-height: 20px;
		}
	}
	thead {
		background-color: #f7fafc;
		
		td {
			text-transform: uppercase;
			font-size: 13px;
			color: #1a1f36;
			font-weight: 500;
			vertical-align: middle;
			line-height: 20px;
			user-select: none;
		}
	}
	tr {
		td {
			box-shadow: inset 0 -1px #e3e8ee;
			padding: 8px;
			
			&:first-child {
				padding-left: 20px;
			}
		}
	}
	
	&__header {
		&-item {
			align-items: center;
			svg {
				margin-left: 8px;
				fill: #8792a2;
			}
		}
	}
	&__checkbox {
		label {
			opacity: 0;
		}
	}
	
	tr:hover > &__checkbox {
		label {
			opacity: 1;
		}
	}
}
</style>