<?php

namespace App\Enums;

enum PinjamanStatus : string
{
    case Pending = 'pending';
    case Approve = 'approve';
    case Decline = 'decline';

}
