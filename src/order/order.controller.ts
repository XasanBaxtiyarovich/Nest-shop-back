import {
    Controller,
    Get,
    Post,
    Body,
    Param,
    Put,
    Delete,
    HttpCode,
    HttpStatus,
} from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto';
import { UpdateOrderDto } from './dto';
import { ApiTags, ApiResponse, ApiParam, ApiBody, ApiOperation } from '@nestjs/swagger';

@ApiTags('Orders')
@Controller('orders')
export class OrderController {
    constructor(private readonly orderService: OrderService) {}

    @Post()
    @HttpCode(HttpStatus.CREATED)
    @ApiResponse({ status: HttpStatus.CREATED, description: 'Order created successfully' })
    @ApiOperation({ summary: 'Create a new order' })
    @ApiBody({ type: CreateOrderDto })
    createOrder(@Body() createOrderDto: CreateOrderDto) {
        return this.orderService.createOrder(createOrderDto);
    }

    @Get()
    @ApiResponse({ status: HttpStatus.OK, description: 'Retrieved all orders successfully' })
    @ApiOperation({ summary: 'Get all orders' })
    getAllOrders() {
        return this.orderService.getAllOrders();
    }

    @Get(':id')
    @ApiResponse({ status: HttpStatus.OK, description: 'Retrieved order by ID successfully' })
    @ApiOperation({ summary: 'Get order by ID' })
    @ApiParam({ name: 'id', description: 'Order ID' })
    getOrderById(@Param('id') id: string) {
        return this.orderService.getOrderById(+id);
    }

    @Put(':id')
    @ApiResponse({ status: HttpStatus.OK, description: 'Updated order by ID successfully' })
    @ApiOperation({ summary: 'Update order by ID' })
    @ApiParam({ name: 'id', description: 'Order ID' })
    @ApiBody({ type: UpdateOrderDto })
    updateOrder(@Param('id') id: string, @Body() updateOrderDto: UpdateOrderDto) {
        return this.orderService.updateOrder(+id, updateOrderDto);
    }

    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    @ApiResponse({ status: HttpStatus.NO_CONTENT, description: 'Deleted order by ID successfully' })
    @ApiOperation({ summary: 'Delete order by ID' })
    @ApiParam({ name: 'id', description: 'Order ID' })
    removeOrder(@Param('id') id: string) {
        return this.orderService.removeOrder(+id);
    }
}
